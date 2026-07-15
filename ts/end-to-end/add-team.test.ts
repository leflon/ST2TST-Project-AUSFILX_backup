import { test, expect } from './fixtures';

test("has title", async ({browser}) => {
  // TODO: remove 'slowMo' when done debugging
  const page = await browser.newPage();

  // Reset database
  await page.goto("/reset_db");
  const proceedButton = page.locator("button:has-text('proceed')");
  await proceedButton.click();

  // Create a new team
  await page.goto("/add_team");
  const nameInput = page.locator('input[name="name"]');
  const teamName = "my team";
  await nameInput.fill(teamName);
  await page.click("text='Add'");

  // Check the team has been created
  await page.goto("/teams");
  const isVisible = await page.isVisible(`td:has-text('${teamName}')`);
  expect(isVisible).toBe(true);
});

test("should not allow blank team name", async ({ page }) => {
  await page.goto("/add_team");
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('    ');
  await page.getByRole('button', { name: 'Add' }).click();
  
  expect(page.getByText("Team name cannot be blank.")).toBeVisible();
});