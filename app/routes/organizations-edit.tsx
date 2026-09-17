import EditOrganizations from "../pages/organizations/edit";
import type { Route } from "./+types/organizations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Organization" },
    { name: "description", content: "Edit Organization" },
  ];
}

export default function EditOrganizationsPage() {
  return <EditOrganizations />;
}
