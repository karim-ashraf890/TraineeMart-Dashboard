import AddTrainee from "../pages/trainees/add";
import type { Route } from "./+types/trainees-add";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add Trainee" },
    { name: "description", content: "Add a new Trainee" },
  ];
}

export default function AddTraineePage() {
  return <AddTrainee />;
}
