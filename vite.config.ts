import babelPlugin from "@rolldown/plugin-babel"
import tailwindcss from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import viteReact, {
  reactCompilerPreset
} from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import { defineConfig } from "vite"

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    viteReact(),
    babelPlugin({
      presets: [reactCompilerPreset()]
    }),
    nitro({
      preset: "azure-swa",
      prerender: {
        routes: ["/"],
      },
      azure: {
        config: {
          platform: {
            apiRuntime: "node:22",
          },
        },
      },
    }),
  ],
})

export default config
