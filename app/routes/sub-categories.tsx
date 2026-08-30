import SubCategories from "../pages/sub-categories";
import type { Route } from "./+types/sub-categories";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sub Categories" },
    { name: "description", content: "Manage Sub Categories" },
  ];
}

export default function SubCategoriesPage() {
  return <SubCategories />;
}
