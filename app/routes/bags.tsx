import Bags from "../pages/bags";
import type { Route } from "./+types/bags";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Bags" }, { name: "description", content: "Manage Bags" }];
}

export default function BagsPage() {
  return <Bags />;
}
