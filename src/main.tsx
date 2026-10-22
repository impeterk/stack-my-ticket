import { StrictMode } from "react"

import { RouterProvider } from "@tanstack/react-router"
import ReactDOM from "react-dom/client"

import { AuthProvider, useAuth } from "./providers/auth-provider"
import { getRouter } from "./router"

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

function App() {
  const auth = useAuth()
  return (
    <AuthProvider>
      <RouterProvider router={getRouter()} context={{ auth }} />
    </AuthProvider>
  )
}
