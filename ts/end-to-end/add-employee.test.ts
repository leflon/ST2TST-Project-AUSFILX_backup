import { test, expect } from './fixtures';
import { mockEmployee } from './pom/AddEmployeePage';

test('should not send the form with empty fields', async ({ addEmployeePage, page }) => {

  await addEmployeePage.addEmployee({
    name: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zip: "",
    hiringDate: "",
    jobTitle: "",
  });
  expect(page.url()).not.toBe('/employees');
});

test('insert a negative zipcode', async ({ addEmployeePage, page }) => {
  test.setTimeout(3_000);
  await addEmployeePage.addEmployee({
    ...mockEmployee,
    zip: '-123456'
  });
  
  await expect(page.getByText('Zip code must be a positive number')).toBeVisible();
});