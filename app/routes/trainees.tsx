import Trainees from "../pages/trainees";
import type { Route } from "./+types/trainees";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trainees" },
    { name: "description", content: "Manage Trainees" },
  ];
}

export default function TraineesPage() {
  return <Trainees />;
}
