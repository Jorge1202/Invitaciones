import { getCurrentTenant } from "@/actions/studio-actions";
import { getAccessibleTemplates } from "@/actions/event-actions";
import { redirect } from "next/navigation";
import CreateEventForm from "./create-event-form";

export default async function NewEventPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/studio");

  const templates = await getAccessibleTemplates(tenant.plan);

  return (
    <div className="max-w-3xl mx-auto">
      <CreateEventForm templates={templates} />
    </div>
  );
}
