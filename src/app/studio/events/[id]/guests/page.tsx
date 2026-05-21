import { getEventById } from "@/actions/event-actions";
import { getGuests } from "@/actions/guest-actions";
import { notFound } from "next/navigation";
import GuestsManager from "./guests-manager";

export default async function GuestsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [event, guests] = await Promise.all([
    getEventById(id),
    getGuests(id),
  ]);

  if (!event) notFound();

  return (
    <GuestsManager
      eventId={event.id}
      eventName={event.name}
      eventSlug={event.slug}
      guests={guests}
    />
  );
}
