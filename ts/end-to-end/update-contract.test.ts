import { test, expect } from '@playwright/test';



test('Should allow contract date edition', async ({ page }) => {
  await page.goto('https://a.i2.hr.dmerej.info/employees');
  await page.getByRole('link', { name: 'Edit' }).first().click();
  await page.getByRole('link', { name: 'Update contract' }).click();
  const input = page.getByRole('textbox', { name: 'Hiring date' })
  await input.fill('2004-02-11')
  expect(input.inputValue()).toBe('2004-02-11')
});