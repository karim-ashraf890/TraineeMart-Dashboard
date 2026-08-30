import AddAdmin from "../pages/admins/add";
import type { Route } from "./+types/admins-add";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add Admin" },
    { name: "description", content: "Add a new Admin" },
  ];
}

export default function AddAdminPage() {
  return <AddAdmin />;
}
