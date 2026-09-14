import EditTrainee from "../pages/trainees/edit";
import type { Route } from "./+types/trainees-edit";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Trainee" },
    { name: "description", content: "Edit Trainee" },
  ];
}

export default function EditTraineePage() {
  return <EditTrainee />;
}
