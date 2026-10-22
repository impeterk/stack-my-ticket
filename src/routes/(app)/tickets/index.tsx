import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/(app)/tickets/")({
  staleTime: 5 * 60 * 1000,
  preloadStaleTime: 5 * 60 * 1000,
  loader: () => {
    const timestamp = String(Date.now());
    return timestamp;
  },
  component: RouteComponent,

  errorComponent: () => <div>Error</div>,
});

function RouteComponent() {
  const now = Route.useLoaderData();
  return <div>Hello "/tickets/"! {now}</div>;
}
