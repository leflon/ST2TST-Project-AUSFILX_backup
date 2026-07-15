import { Page, Locator } from "@playwright/test";

export class AddToTeamPage {
  readonly page: Page;
  readonly teamSelect: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.teamSelect = page.getByLabel("Team");
    this.submitButton = page.getByRole("button", { name: "Add" });
  }

  async addToTeam(teamName: string) {
    await this.teamSelect.selectOption(teamName + " team");
    await this.submitButton.click();
  }
}
