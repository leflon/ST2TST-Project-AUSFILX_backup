import { Page, Locator } from "@playwright/test";

export class EmployeesPage {
  readonly page: Page;
  readonly editLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editLinks = page.getByRole("link", { name: "Edit" });
  }

  async goto() {
    await this.page.goto("/employees");
  }

  async editFirst() {
    await this.editLinks.first().click();
  }

  getEmployeeByName(name: string): Locator {
    return this.page.getByText(name);
  }
}
