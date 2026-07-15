import { test, expect } from './fixtures';

test('Should allow contract date edition', async ({ page, withUser }) => {
  test.setTimeout(3_000); // If the input was not modified, the test would hang for too long.
  await page.goto('/employees');
  await page.getByRole('link', { name: 'Edit' }).first().click();
  await page.getByRole('link', { name: 'Update contract' }).click();
  const input = page.getByRole('textbox', { name: 'Hiring date' })
  await input.fill('2004-02-11')
  
  expect(input.inputValue()).toBe('2004-02-11')
});