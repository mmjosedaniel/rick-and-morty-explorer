import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    manifest: true,
    target: ["chrome111", "edge111", "firefox128", "safari16.4"],
  },
});
