import ConsultationRequests from "../pages/consultation-requests";
import type { Route } from "./+types/consultation-requests";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Consultation Requests" },
    { name: "description", content: "Manage Consultation Requests" },
  ];
}

export default function ConsultationRequestsPage() {
  return <ConsultationRequests />;
}
