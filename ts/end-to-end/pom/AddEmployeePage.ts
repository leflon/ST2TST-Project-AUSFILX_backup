// pages/AddTeamPage.ts
import { Page, Locator } from "@playwright/test";

export type Employee = {
  name: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zip: string;
  hiringDate: string;
  jobTitle: string;
}

export const mockEmployee = {
  name: "Kevin",
  email: "kevin@diesel.com",
  addressLine1: "30 Street of streets",
  addressLine2: "Apt 101",
  city: "Thonon-Les-Bains",
  zip: "80800",
  hiringDate: "2004-02-11",
  jobTitle: "CEO"
};

export class AddEmployeePage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput1: Locator;
  readonly addressInput2: Locator;
  readonly cityInput: Locator;
  readonly zipInput: Locator;
  readonly hiringDateInput: Locator;
  readonly jobTitleInput: Locator;
  
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.addressInput1 = page.locator("#id_address_line1")
    this.addressInput2 = page.locator("#id_address_line2")
    this.cityInput = page.getByRole("textbox", { name: "City" });
    this.zipInput = page.getByRole("spinbutton", { name: "Zip code" });
    this.hiringDateInput = page.getByRole("textbox", { name: "Hiring date" });
    this.jobTitleInput = page.getByRole("textbox", { name: "Job title" });
    this.submitButton = page.getByRole("button", { name: "Add" });
  }

  async goto() {
    await this.page.goto("/add_employee");
  }

  async addEmployee(user: Employee) {
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);
    await this.addressInput1.fill(user.addressLine1);
    await this.addressInput2.fill(user.addressLine2);
    await this.cityInput.fill(user.city);
    await this.zipInput.fill(user.zip);
    await this.hiringDateInput.fill(user.hiringDate);
    await this.jobTitleInput.fill(user.jobTitle);
    await this.submitButton.click();
  }
}