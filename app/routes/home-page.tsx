import Home from "../pages/pagess/home-page";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home Page" },
    { name: "description", content: "Manage Home Page" },
  ];
}

export default function HomePage() {
  return <Home />;
}
