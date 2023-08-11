import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        // Do not process css files (is slow)
        css: false,
        environment: "jsdom",
        // This is to not import test, it, expect, vi (instead of jest). Similar to how jest works
        globals: true,
    },
});
