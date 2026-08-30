import Categories from "../pages/categories";
import type { Route } from "./+types/categories";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Categories" },
    { name: "description", content: "Manage Categories" },
  ];
}

export default function CategoriesPage() {
  return <Categories />;
}
