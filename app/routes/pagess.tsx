import Pages from "../pages/pagess";
import type { Route } from "./+types/bags";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Pages" }, { name: "description", content: "Manage Pages" }];
}

export default function PagesPage() {
  return <Pages />;
}
