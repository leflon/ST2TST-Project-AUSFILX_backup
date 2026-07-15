import { Page, Locator } from "@playwright/test";

export class UpdateContractPage {
  readonly page: Page;
  readonly hiringDateInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hiringDateInput = page.getByRole("textbox", { name: "Hiring date" });
  }

  async fillHiringDate(date: string) {
    await this.hiringDateInput.fill(date);
  }
}
