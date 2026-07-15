import { test as base, defineConfig } from "@playwright/test";
import { AddEmployeePage, Employee, mockEmployee } from "./pom/AddEmployeePage";
import { AddTeamPage, mockTeam } from "./pom/AddTeamPage";

type Fixtures = {
  resetDb: void;
  employee: Employee;
  team: string;
};

defineConfig({
  use: {
    baseURL: "https://a.i2.hr.dmerej.info",
  },
});

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
  employee: async ({ page }, use) => {
    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.goto();
    await addEmployeePage.addEmployee(mockEmployee);
    await use(mockEmployee);
  },
  team: async ({ page }, use) => {
    const addTeamPage = new AddTeamPage(page);
    await addTeamPage.goto();
    await addTeamPage.addTeam(mockTeam);

    await use(mockTeam);
  },
});

// So that we can import expect and test from the same file, simple shortcut.
export { expect } from "@playwright/test";
