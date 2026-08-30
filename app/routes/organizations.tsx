import Organizations from "../pages/organizations";
import type { Route } from "./+types/organizations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Organizations" },
    { name: "description", content: "Manage Organizations" },
  ];
}

export default function OrganizationsPage() {
  return <Organizations />;
}
