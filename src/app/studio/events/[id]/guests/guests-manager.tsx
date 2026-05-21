"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { createGuest, createGuestsBulk, deleteGuest } from "@/actions/guest-actions";
import {
  ArrowLeft,
  UserPlus,
  Upload,
  Copy,
  Check,
  Trash2,
  Users2,
  X,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type RSVPStatus = "pending" | "confirmed" | "declined";

interface Guest {
  id: string;
  name: string;
  passes: number;
  token: string;
  status: RSVPStatus;
  confirmedPasses: number | null;
  createdAt: Date;
}

interface Props {
  eventId: string;
  eventName: string;
  eventSlug: string;
  guests: Guest[];
}

const STATUS_STYLE: Record<RSVPStatus, string> = {
  pending:   "bg-amber-50  text-amber-700  border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  declined:  "bg-red-50    text-red-700    border-red-200",
};

const STATUS_LABEL: Record<RSVPStatus, string> = {
  pending:   "Pendiente",
  confirmed: "Confirmó",
  declined:  "Declinó",
};

function parseCSV(text: string): {
  valid: { name: string; passes: number }[];
  errors: string[];
} {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return { valid: [], errors: ["El archivo no tiene datos (se requiere cabecera + al menos una fila)."] };

  const valid: { name: string; passes: number }[] = [];
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(",");
    const name = parts[0]?.trim();
    const rawPasses = parts[1]?.trim();
    const passes = rawPasses ? parseInt(rawPasses, 10) : 1;

    if (!name) { errors.push(`Fila ${i + 1}: nombre vacío.`); continue; }
    if (isNaN(passes) || passes < 1) { errors.push(`Fila ${i + 1}: pases inválidos ("${rawPasses}").`); continue; }

    valid.push({ name, passes });
  }

  return { valid, errors };
}

export default function GuestsManager({ eventId, eventName, eventSlug, guests: initial }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Add guest modal
  const [showAdd, setShowAdd] = useState(false);
  const [addName, setAddName] = useState("");
  const [addPasses, setAddPasses] = useState(1);
  const [addError, setAddError] = useState<string | null>(null);

  // CSV
  const csvInputRef = useRef<HTMLInputElement>(null);
  const [csvMessage, setCsvMessage] = useState<string | null>(null);
  const [csvErrors, setCsvErrors] = useState<string[]>([]);

  // Copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Delete confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleAddGuest(e: React.FormEvent) {
    e.preventDefault();
    setAddError(null);
    startTransition(async () => {
      const result = await createGuest(eventId, { name: addName, passes: addPasses });
      if (result.success) {
        setShowAdd(false);
        setAddName("");
        setAddPasses(1);
        router.refresh();
      } else {
        setAddError(result.error ?? "Error al añadir invitado.");
      }
    });
  }

  function handleCSVChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvMessage(null);
    setCsvErrors([]);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const { valid, errors } = parseCSV(text);

      if (errors.length > 0) setCsvErrors(errors);

      if (valid.length > 0) {
        startTransition(async () => {
          const result = await createGuestsBulk(eventId, valid);
          if (result.success) {
            setCsvMessage(`${result.created} invitado${result.created !== 1 ? "s" : ""} importados correctamente.`);
            router.refresh();
          }
        });
      } else if (errors.length === 0) {
        setCsvErrors(["El archivo no contiene filas válidas."]);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  async function handleCopy(guest: Guest) {
    const url = `${window.location.origin}/e/${eventSlug}/${guest.token}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function handleDelete(guestId: string) {
    if (deletingId !== guestId) { setDeletingId(guestId); return; }
    setDeletingId(null);
    startTransition(async () => {
      await deleteGuest(guestId, eventId);
      router.refresh();
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <header className="flex items-start gap-4">
        <Link
          href={`/studio/events/${eventId}`}
          className="mt-1 p-2 rounded-xl text-studio-text-dim hover:text-studio-text hover:bg-white transition-all shrink-0"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-studio-text-dim mb-1">
            {eventName}
          </p>
          <h1 className="text-3xl font-fraunces font-bold text-studio-text">
            Invitados
          </h1>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <input
            ref={csvInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleCSVChange}
          />
          <button
            onClick={() => csvInputRef.current?.click()}
            disabled={isPending}
            className="flex items-center gap-2 border border-studio-border bg-white text-studio-text px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-studio-bg transition-all disabled:opacity-50"
          >
            <Upload size={16} />
            Cargar CSV
          </button>
          <button
            onClick={() => { setShowAdd(true); setAddError(null); }}
            className="flex items-center gap-2 bg-studio-text text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-studio-accent transition-all shadow-soft"
          >
            <UserPlus size={16} />
            Añadir Invitado
          </button>
        </div>
      </header>

      {/* CSV feedback */}
      {csvMessage && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm">
          <Check size={16} />
          {csvMessage}
        </div>
      )}
      {csvErrors.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-1">
          <p className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <AlertCircle size={16} />
            Advertencias al importar CSV
          </p>
          <ul className="list-disc list-inside space-y-0.5 mt-2">
            {csvErrors.map((err, i) => (
              <li key={i} className="text-xs text-amber-700">{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* CSV format hint */}
      <div className="flex items-start gap-3 text-xs text-studio-text-dim bg-studio-bg border border-studio-border rounded-xl px-4 py-3">
        <AlertCircle size={14} className="mt-0.5 shrink-0 text-studio-text-dim" />
        <span>
          Formato CSV esperado: <code className="font-mono bg-white border border-studio-border px-1 rounded">nombre,pases</code> (primera fila = cabecera, columna pases opcional — por defecto 1).
        </span>
      </div>

      {/* Guests list */}
      {initial.length === 0 ? (
        <div className="py-28 border-2 border-dashed border-studio-border rounded-[3rem] flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-studio-accent-soft rounded-full flex items-center justify-center text-studio-accent">
            <Users2 size={28} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-fraunces font-bold text-studio-text">Sin invitados todavía</h3>
            <p className="text-studio-text-dim italic mt-1 text-sm max-w-xs mx-auto">
              Añade invitados uno a uno o importa una lista desde un archivo CSV.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-studio-border rounded-[2rem] overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_80px_120px_auto] gap-4 px-6 py-3 bg-studio-bg border-b border-studio-border text-[10px] font-bold uppercase tracking-widest text-studio-text-dim">
            <span>Nombre</span>
            <span className="text-center">Pases</span>
            <span className="text-center">RSVP</span>
            <span className="text-center">Link</span>
          </div>

          {initial.map((guest, idx) => (
            <div
              key={guest.id}
              className={cn(
                "grid grid-cols-[1fr_80px_120px_auto] gap-4 px-6 py-4 items-center transition-colors",
                idx !== initial.length - 1 && "border-b border-studio-border/60",
                deletingId === guest.id && "bg-red-50"
              )}
            >
              {/* Name */}
              <span className="font-semibold text-studio-text truncate">{guest.name}</span>

              {/* Passes */}
              <span className="text-center">
                <span className="inline-block bg-studio-accent-soft text-studio-accent font-bold text-xs px-2.5 py-1 rounded-full">
                  {guest.passes} {guest.passes === 1 ? "pase" : "pases"}
                </span>
              </span>

              {/* RSVP status */}
              <span className="text-center">
                <span className={cn(
                  "inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border",
                  STATUS_STYLE[guest.status as RSVPStatus]
                )}>
                  {STATUS_LABEL[guest.status as RSVPStatus]}
                  {guest.status === "confirmed" && guest.confirmedPasses != null && (
                    <span className="ml-1 opacity-70">({guest.confirmedPasses})</span>
                  )}
                </span>
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => handleCopy(guest)}
                  title="Copiar link de invitación"
                  className={cn(
                    "p-2 rounded-lg transition-all text-sm",
                    copiedId === guest.id
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-studio-bg text-studio-text-dim hover:text-studio-accent hover:bg-studio-accent-soft"
                  )}
                >
                  {copiedId === guest.id ? <Check size={15} /> : <Copy size={15} />}
                </button>

                <button
                  onClick={() => handleDelete(guest.id)}
                  disabled={isPending}
                  title={deletingId === guest.id ? "Haz clic de nuevo para confirmar" : "Eliminar invitado"}
                  className={cn(
                    "p-2 rounded-lg transition-all text-sm",
                    deletingId === guest.id
                      ? "bg-red-100 text-red-600 animate-pulse"
                      : "bg-studio-bg text-studio-text-dim hover:text-red-500 hover:bg-red-50"
                  )}
                >
                  {deletingId === guest.id ? <X size={15} /> : <Trash2 size={15} />}
                </button>
              </div>
            </div>
          ))}

          {/* Footer summary */}
          <div className="px-6 py-3 bg-studio-bg border-t border-studio-border flex items-center justify-between text-xs text-studio-text-dim">
            <span>{initial.length} invitado{initial.length !== 1 ? "s" : ""} en total</span>
            <span>
              {initial.filter(g => g.status === "confirmed").length} confirmados ·{" "}
              {initial.filter(g => g.status === "pending").length} pendientes
            </span>
          </div>
        </div>
      )}

      {/* Add guest modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAdd(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-fraunces font-bold text-studio-text">Nuevo Invitado</h2>
              <button
                onClick={() => setShowAdd(false)}
                className="p-2 rounded-xl text-studio-text-dim hover:bg-studio-bg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddGuest} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-studio-text-dim">
                  Nombre <span className="text-studio-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="Ej. María García"
                  className="w-full bg-studio-bg border border-studio-border rounded-xl px-4 py-3 text-studio-text placeholder:text-studio-text-dim/50 focus:ring-2 focus:ring-studio-accent focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-studio-text-dim">
                  Número de Pases
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={addPasses}
                  onChange={(e) => setAddPasses(parseInt(e.target.value, 10) || 1)}
                  className="w-full bg-studio-bg border border-studio-border rounded-xl px-4 py-3 text-studio-text focus:ring-2 focus:ring-studio-accent focus:border-transparent outline-none transition-all"
                />
              </div>

              {addError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                  {addError}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="flex-1 py-3 rounded-2xl border border-studio-border text-studio-text-dim font-semibold hover:bg-studio-bg transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 py-3 rounded-2xl bg-studio-text text-white font-bold hover:bg-studio-accent transition-all disabled:opacity-50"
                >
                  {isPending ? "Guardando..." : "Añadir"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
