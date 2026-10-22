import {
  createHashHistory,
  createRouter as createTanStackRouter,
} from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
const history = createHashHistory();
export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    history,
    context: {
      auth: undefined,
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
