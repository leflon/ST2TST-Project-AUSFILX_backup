import { test, expect } from './fixtures';
import { EmployeesPage } from './pom/EmployeesPage';
import { EditEmployeePage } from './pom/EditEmployeePage';
import { AddToTeamPage } from './pom/AddToTeamPage';
import { TeamsPage } from './pom/TeamsPage';
import { DeleteTeamPage } from './pom/DeleteTeamPage';

test('Should not delete members of a team when deleting the team', async ({ page, employee, team }) => {
  const employeesPage = new EmployeesPage(page);
  const editEmployeePage = new EditEmployeePage(page);
  const addToTeamPage = new AddToTeamPage(page);
  const teamsPage = new TeamsPage(page);
  const deleteTeamPage = new DeleteTeamPage(page);

  await employeesPage.goto();
  await employeesPage.editFirst();
  await editEmployeePage.goToAddToTeam();
  await addToTeamPage.addToTeam(team);

  await teamsPage.goto();
  await teamsPage.deleteFirst();
  await deleteTeamPage.proceed();

  await employeesPage.goto();
  await expect(employeesPage.getEmployeeByName(employee.name)).toBeVisible();
});
