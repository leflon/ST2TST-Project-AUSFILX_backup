import { Page, Locator } from "@playwright/test";

export class TeamsPage {
  readonly page: Page;
  readonly deleteLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteLinks = page.getByRole("link", { name: "Delete" });
  }

  async goto() {
    await this.page.goto("/teams");
  }

  async deleteFirst() {
    await this.deleteLinks.first().click();
  }

  getTeamByName(name: string): Locator {
    return this.page.locator(`td:has-text('${name}')`);
  }
}
