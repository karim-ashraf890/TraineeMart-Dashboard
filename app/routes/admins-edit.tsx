import EditAdmin from "../pages/admins/edit";
import type { Route } from "./+types/admins-edit";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Admin" },
    { name: "description", content: "Edit Admin" },
  ];
}

export default function EditAdminPage() {
  return <EditAdmin />;
}
