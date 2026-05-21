import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TemplateEditorClient from "./editor-client";

export default async function TemplateEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const template = await prisma.template.findUnique({
    where: { id },
  });

  if (!template) {
    notFound();
  }

  // Convert the template object to a plain object to pass to client component safely
  const serializedTemplate = {
    ...template,
    config: template.config as any,
    createdAt: template.createdAt.toISOString(),
    updatedAt: template.updatedAt.toISOString(),
  };

  return <TemplateEditorClient template={serializedTemplate as any} />;
}
