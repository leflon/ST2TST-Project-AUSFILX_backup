import { test as base } from "@playwright/test";

type Fixtures = {
  resetDb: void;
  withUser: void;
  withTeam: void;
};

export const test = base.extend<Fixtures>({
  resetDb: [
    async ({ page }, use) => {
      // Before test: Reset DB
      await page.goto("/reset_db");
      await page.getByRole("button", { name: "Proceed" }).click();

      await use();
    },
    { auto: true }, // Perform this before every test automatically
  ],
  withUser: async ({ page }, use) => {
    await page.goto("/add_employee");
    await page.getByRole("textbox", { name: "Name" }).fill("Paul");
    await page.getByRole("textbox", { name: "Email" }).fill("paul@leflon.fr");
    await page.locator("#id_address_line1").fill("36 rue des rues");
    await page.getByRole("textbox", { name: "City" }).fill("Paris");
    await page.getByRole("spinbutton", { name: "Zip code" }).fill("75015");
    await page.getByRole("textbox", { name: "Hiring date" }).fill("2004-02-11");
    await page.getByRole("textbox", { name: "Job title" }).fill("CEO");
    await page.getByRole("button", { name: "Add" }).click();
    await use();
  },
  withTeam: async ({ page }, use) => {
    await page.goto("/add_team");
    await page.getByRole("textbox", { name: "Name" }).fill("Super Team");
    await page.getByRole("button", { name: "Add" }).click();
    
    await use();
  },
});

// So that we can import expect and test from the same file, simple shortcut.
export { expect } from "@playwright/test";
