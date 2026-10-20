import { StrictMode } from "react"

import { RouterProvider } from "@tanstack/react-router"
import ReactDOM from "react-dom/client"

import { getRouter } from "./router"

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={getRouter()} />
    </StrictMode>
  )
}
