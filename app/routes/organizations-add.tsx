import AddOrganizations from "../pages/organizations/add";
import type { Route } from "./+types/organizations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add Organizations" },
    { name: "description", content: "Add a new Organizations" },
  ];
}

export default function AddOrganizationsPage() {
  return <AddOrganizations />;
}
