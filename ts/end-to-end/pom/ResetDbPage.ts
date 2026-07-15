import { Page, Locator } from "@playwright/test";

export class ResetDbPage {
  readonly page: Page;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedButton = page.getByRole("button", { name: "Proceed" });
  }

  async reset() {
    await this.page.goto("/reset_db");
    await this.proceedButton.click();
  }
}
