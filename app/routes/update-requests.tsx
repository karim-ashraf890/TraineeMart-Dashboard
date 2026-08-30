import UpdateRequests from "../pages/update-requests";
import type { Route } from "./+types/update-requests";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Update Requests" },
    { name: "description", content: "Manage Update Requests" },
  ];
}

export default function UpdateRequestsPage() {
  return <UpdateRequests />;
}
