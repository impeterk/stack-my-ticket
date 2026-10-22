import { createFileRoute, Link, redirect } from "@tanstack/react-router";

const user = true;
export const Route = createFileRoute("/")({
  loader: () => {
    if (user) {
      throw redirect({ to: "/tickets" });
    }
  },
  component: App,
});

function App() {
  return <div>index route</div>;
}
