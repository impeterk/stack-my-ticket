import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { title } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import tw from "@/styles/global.css?url";

const REACT_SCAN = import.meta.env.DEV
  ? {
      src: "https://unpkg.com/react-scan/dist/auto.global.js",
      crossorigin: "anonymous",
    }
  : {};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        title: title(),
      },
    ],
    links: [{ rel: "stylesheet", href: tw }],
    scripts: [REACT_SCAN],
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
  component: () => (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <RootDocument />
    </ThemeProvider>
  ),
});

function RootDocument() {
  return (
    <>
      <HeadContent />
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
      <Scripts />
    </>
  );
}
