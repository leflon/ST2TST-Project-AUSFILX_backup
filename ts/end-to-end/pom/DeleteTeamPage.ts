import { Page, Locator } from "@playwright/test";

export class DeleteTeamPage {
  readonly page: Page;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedButton = page.getByRole("button", { name: "Proceed" });
  }

  async proceed() {
    await this.proceedButton.click();
  }
}
