import { test, expect } from './fixtures';
import { EmployeesPage } from './pom/EmployeesPage';
import { EditEmployeePage } from './pom/EditEmployeePage';
import { UpdateContractPage } from './pom/UpdateContractPage';

test('Should allow contract date edition', async ({ page, employee }) => {
  test.setTimeout(3_000); // If the input was not modified, the test would hang for too long.
  const employeesPage = new EmployeesPage(page);
  const editEmployeePage = new EditEmployeePage(page);
  const updateContractPage = new UpdateContractPage(page);

  await employeesPage.goto();
  await employeesPage.editFirst();
  await editEmployeePage.goToUpdateContract();
  await updateContractPage.fillHiringDate('2004-02-11');

  await expect(updateContractPage.hiringDateInput).toHaveValue('2004-02-11');
});
