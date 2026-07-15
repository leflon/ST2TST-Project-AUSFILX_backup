// pages/AddTeamPage.ts
import { Page, Locator } from "@playwright/test";

export const mockTeam = "Great Scott"

export class AddTeamPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    this.submitButton = page.getByRole("button", { name: "Add" });
  }

  async goto() {
    await this.page.goto("/add_team");
  }

  async addTeam(name: string) {
    await this.nameInput.fill(name);
    await this.submitButton.click();
  }
}