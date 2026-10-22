import { createFileRoute, Link, redirect } from "@tanstack/react-router"

const user = true
export const Route = createFileRoute("/(app)/")({
  loader: ({ context }) => {
    if (!context.auth.user.id) {
      throw redirect({
        to: "/login",
      })
    }
    throw redirect({
      to: "/tickets",
    })
  },
  component: App,
})

function App() {
  return <div>index route</div>
}
