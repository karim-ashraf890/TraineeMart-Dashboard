import Admins from "../pages/admins";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to Dashboard" },
  ];
}

export default function AdminsPage() {
  return <Admins />;
}
