import { test, expect } from './fixtures';

test('Should not delete members of a team when deleting the team', async ({ page, employee, team }) => {
  await page.goto('/employees');
  await page.getByRole('link', { name: 'Edit' }).first().click();
  await page.getByRole('link', { name: 'Add to team' }).click();
  await page.getByLabel('Team').selectOption(team + ' team')
  await page.getByRole('button', { name: 'Add' }).click();
  await page.goto('/teams');
  await page.getByRole('link', { name: 'Delete' }).first().click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.goto('/employees');

  expect(page.getByText("No employees")).not.toBeVisible();
});