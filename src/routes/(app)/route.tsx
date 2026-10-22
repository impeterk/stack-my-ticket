import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { SidebarLayout } from "@/layouts/sidebar-layout"
import { useAuth } from "@/providers/auth-provider"

export const Route = createFileRoute("/(app)")({
  component: RouteComponent,
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
})

function RouteComponent() {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  )
}
