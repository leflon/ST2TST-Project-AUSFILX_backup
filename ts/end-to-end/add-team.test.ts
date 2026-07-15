import { test, expect } from './fixtures';
import { TeamsPage } from './pom/TeamsPage';

test("has title", async ({ addTeamPage, page }) => {
  const teamName = "my team";
  await addTeamPage.addTeam(teamName);

  const teamsPage = new TeamsPage(page);
  await teamsPage.goto();
  await expect(teamsPage.getTeamByName(teamName)).toBeVisible();
});

test("should not allow blank team name", async ({ addTeamPage }) => {
  await addTeamPage.addTeam("  ");
  await expect(addTeamPage.blankNameError).toBeVisible();
});
