import { test as base, defineConfig } from "@playwright/test";
import { AddEmployeePage, Employee, mockEmployee } from "./pom/AddEmployeePage";
import { AddTeamPage, mockTeam } from "./pom/AddTeamPage";
import { ResetDbPage } from "./pom/ResetDbPage";

type Fixtures = {
  resetDb: void;
  employee: Employee;
  team: string;
  addEmployeePage: AddEmployeePage;
  addTeamPage: AddTeamPage;
};

defineConfig({
  use: {
    baseURL: "https://a.i2.hr.dmerej.info",
  },
});

export const test = base.extend<Fixtures>({
  addEmployeePage: async ({ page }, use) => {
    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.goto();
    await use(addEmployeePage);
  },
  addTeamPage: async ({ page }, use) => {
    const addTeamPage = new AddTeamPage(page);
    await addTeamPage.goto();
    await use(addTeamPage);
  },
  resetDb: [
    async ({ page }, use) => {
      await new ResetDbPage(page).reset();
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
