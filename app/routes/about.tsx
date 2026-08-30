import About from "../pages/pagess/about-page";
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us Page" },
    { name: "description", content: "Manage About Us Page" },
  ];
}

export default function AboutPage() {
  return <About />;
}
