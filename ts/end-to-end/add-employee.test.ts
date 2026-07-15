import { test, expect } from './fixtures';

test('should not send the form with empty fields', async ({ page }) => {
  await page.goto('https://a.i2.hr.dmerej.info/add_employee');
  await page.getByRole('button', { name: 'Add' }).click();

  // If we are redirected to /employees, this means the form was submitted.
  expect(page.url()).not.toBe('https://a.i2.hr.dmerej.info/employees');
});

test('insert a negative zipcode', async ({ page }) => {
  await page.goto('https://a.i2.hr.dmerej.info/add_employee');
  await page.getByRole('textbox', { name: 'Name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');
  await page.locator('#id_address_line1').fill('Test rue test');
  await page.getByRole('textbox', { name: 'City' }).fill('Test');
  await page.getByRole('spinbutton', { name: 'Zip code' }).fill('-12345');
  await page.getByRole('textbox', { name: 'Hiring date' }).fill('2026-07-15');
  await page.getByRole('textbox', { name: 'Job title' }).fill('dev');
  await page.getByRole('button', { name: 'Add' }).click();
  
  await expect(page.getByText('Zip code must be a positive number')).toBeVisible();
});