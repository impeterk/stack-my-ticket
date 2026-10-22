import type { NavItem as Process } from "@/layouts/sidebar-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

export const create_process_list: Process[] = [
  {
    id: "editing",
    to: "/create/editing",
    label: "Web Editing",
  },
  {
    id: "pim",
    to: "/create/pim",
    label: "Product Integration",
  },
];

function RouteComponent() {
  return <div>Hello "/create"!</div>;
}
