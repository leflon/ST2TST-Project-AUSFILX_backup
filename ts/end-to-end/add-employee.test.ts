import { test, expect } from './fixtures';

test('should not send the form with empty fields', async ({ page }) => {
  await page.goto('https://a.i2.hr.dmerej.info/add_employee');
  await page.getByRole('button', { name: 'Add' }).click();

  // If we are redirected to /employees, this means the form was submitted.
  expect(page.url()).not.toBe('https://a.i2.hr.dmerej.info/employees');
});