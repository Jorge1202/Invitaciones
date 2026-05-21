import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TemplateEditorClient from "./editor-client";
import { type TemplateConfig } from "@/components/command/config-editor";

interface SerializedTemplate {
  id: string;
  name: string;
  componentId: string;
  config: TemplateConfig;
  createdAt: string;
  updatedAt: string;
}

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

  const serializedTemplate: SerializedTemplate = {
    id: template.id,
    name: template.name,
    componentId: template.componentId,
    config: template.config as TemplateConfig,
    createdAt: template.createdAt.toISOString(),
    updatedAt: template.updatedAt.toISOString(),
  };

  return <TemplateEditorClient template={serializedTemplate} />;
}
