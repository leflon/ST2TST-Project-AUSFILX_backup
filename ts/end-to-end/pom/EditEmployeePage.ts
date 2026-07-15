import { Page, Locator } from "@playwright/test";

export class EditEmployeePage {
  readonly page: Page;
  readonly addToTeamLink: Locator;
  readonly updateContractLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToTeamLink = page.getByRole("link", { name: "Add to team" });
    this.updateContractLink = page.getByRole("link", { name: "Update contract" });
  }

  async goToAddToTeam() {
    await this.addToTeamLink.click();
  }

  async goToUpdateContract() {
    await this.updateContractLink.click();
  }
}
