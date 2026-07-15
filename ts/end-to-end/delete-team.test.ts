import { test, expect } from './fixtures';

test('Should not delete members of a team when deleting the team', async ({ page, withUser, withTeam }) => {
  await page.goto('https://a.i2.hr.dmerej.info/employees');
  await page.getByRole('link', { name: 'Edit' }).first().click();
  await page.getByRole('link', { name: 'Add to team' }).click();
  await page.getByLabel('Team').selectOption('Super Team team')
  await page.getByRole('button', { name: 'Add' }).click();
  await page.goto('https://a.i2.hr.dmerej.info/teams');
  await page.getByRole('link', { name: 'Delete' }).first().click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.goto('https://a.i2.hr.dmerej.info/employees');

  expect(page.getByText("No employees")).not.toBeVisible();
});