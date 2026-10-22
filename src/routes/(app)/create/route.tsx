import { createFileRoute, Outlet } from "@tanstack/react-router"

import type { NavItem as Process } from "@/layouts/sidebar-layout"

export const Route = createFileRoute("/(app)/create")({
  component: RouteComponent,
})

export const create_process_list: Process[] = [
  {
    id: "wsba",
    to: "/create/wsba",
    label: "Web Editing",
  },
  {
    id: "pim",
    to: "/create/pim",
    label: "Product Integration",
  },
]

function RouteComponent() {
  return (
    <div>
      Hello "/create"!
      <Outlet />
    </div>
  )
}
