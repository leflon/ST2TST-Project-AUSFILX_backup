import { defineConfig, devices } from "@playwright/test";
import { baseUrl } from "./config";

export default defineConfig({
  testDir: "./end-to-end",
  fullyParallel: false,
  use: {
    baseURL: baseUrl,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], headless: false },
    },
  ],
});
