import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sign-in", "./routes/sign-in.tsx"),
  route("admins", "./routes/admins.tsx"),
  route("admins/add", "./routes/admins-add.tsx"),
  route("admins/edit/:id", "./routes/admins-edit.tsx"),
  route("bags", "./routes/bags.tsx"),
  route("categories", "./routes/categories.tsx"),
  route("consultation-requests", "./routes/consultation-requests.tsx"),
  route("courses", "./routes/courses.tsx"),
  route("organizations", "./routes/organizations.tsx"),
  route("sub-categories", "./routes/sub-categories.tsx"),
  route("trainees", "./routes/trainees.tsx"),
  route("trainees/add", "./routes/trainees-add.tsx"),
  route("trainees/edit/:id", "./routes/trainees-edit.tsx"),
  route("update-requests", "./routes/update-requests.tsx"),
  route("pages/home", "./routes/home-page.tsx"),
  route("pages/about", "./routes/about.tsx"),
  route("pages/contact", "./routes/contact.tsx"),
  route("my-profile", "./routes/my-profile.tsx"),
] satisfies RouteConfig;
