import { createFileRoute, Link } from "@tanstack/react-router"

import { Pattern } from "@/components/examples/c-sidebar-1"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return <Pattern />
}
