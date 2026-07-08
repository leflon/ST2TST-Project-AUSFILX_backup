# v2026.1.0 - Testing plan

**Start with empty Database.**

- **Task \#1**: List employees (/employees)
  - **Expected result:** No employees (**Status**: ✅)

- **Task \#2**: Add an employee (**/add_employee**)
  - **Task \#2.1**: Try to submit the form with empty fields\
    **Expected result**: Should not allow form submission (**Status**: ✅)
  - **Task \#2.2**: Try to submit with invalid email (incorrect format)  
    **Expected result:** Should not allow form submission (**Status**: ✅)
  - **Task \#2.3**: Try to submit with negative zip code  
    **Expected result:** Should not allow form submission (**Status**: ❌)
  - **Task \#2.3 bis**: Try to submit with zip code greater than 2147483647  
    **Expected result:** Should not allow form submission (**Status**: ✅)
  - **Task \#2.4**: Try to submit form with correct mock data  
    **Expected result:**
    - Should redirect to /employees with the freshly created user (**Status**: ✅)
    - The new user should not be a manager (**Status**: ✅)

- **Task \#3**: Add a second employee (/add_employee)
  - **Task \#3.1**: Try to add an employee with the same e-mail address as the first one  
    **Expected result:** Should not allow form submission (**Status**: ❌)
  - **Task \#3.2**: Try to submit format with correct mock data  
    **Expected result**: Same as **\#2.5** (**Status**: ✅)

- **Task \#4: Display “Edit employee” page (/employee/:id)**

  **Expected result:** Displayed employee data must match data used at creation (name, email, job title, hiring date) (**Status**: ✅)

- **Task \#5: Edit employee basic info (/employee/:id/basic_info)**
  - **Task \#5.1:** Try to submit form with invalid name and/or e-mail (empty / wrong format)  
    **Expected result:** Should not allow form submission (**Status**: ✅)
  - **Task \#5.2:** Try to submit form with an already used e-mail\
    **Expected result:** Should not allow form submission (**Status**: ❌)
  - **Task \#5.3:** Try to submit form with valid new data\
    **Expected result:** Should redirect to /employee/:id, showing updated data. (**Status**: ✅)

- **Task \#6: Edit an employee address (/employee/:id/address)**
  - **Task \#6.1:** Try to submit form with empty value for first address line, city, and/or zip code  
    **Expected result:** Should not allow form submission (**Status**: ✅)
  - **Task \#6.2:** Try to submit form with negative zip code  
    **Expected result:** Should not allow form submission (**Status**: ❌)
  - **Task \#6.2:** Try to submit form with valid data, and an empty second address line  
    **Expected result:** Should redirect to /employee/:id (**Status**: ✅)
  - **Task \#6.3:** Visit “Edit Address” form again for the same user  
    **Expected result:** Displayed data should match provided data from Task \#6.2 (**Status**: ❌)

- **Task \#7: Edit an employee contract (/employee/:id/contract)**
  - **Task \#7.1:** Try to modify the contract date\
    **Expected result:** Should allow to modify the date input (**Status**: ❌)
  - **Task \#7.2**: Try to submit with empty date/job title  
    **Expected result**: Should not allow form submission (**Status**: ✅)
  - **Task \#7.3:** Try to submit form with valid data  
    **Expected result:** Should redirect to /employee/:id (**Status**: ✅)
  - **Task \#7.4**: Visit “Edit Contract” form again for the same user  
    **Expected result:** Displayed data should match provided data from Task \#7.3 (**Status**: ✅)

- **Task \#8: Promote an employee that is not a manager (/employee/:id/promote)**
  - **Task \#8.1:** Click on the button proceed  
    **Expected result:**
    - Should redirect to /employees (**Status**: ✅)
    - Should show **yes** in the manager column for this user (**Status**: ✅)

  - **Task \#8.2**: Visit “Edit Employee” page for the same user  
    **Expected result:** Should display “Demote manager” instead of “Promote as Manager” (**Status**: ❌)

- **Task \#9**: List teams (**/teams**):  
  **Expected result:** Should display no teams (**Status**: ✅)

- **Task \#10**: Add a team (**/add_team**)
  - **Task \#10.1**: Try to submit the form with empty fields  
    **Expected result**: Should not allow form submission (**Status**: ✅)
  - **Task \#10.2**: Try to submit the form with HTML characters in the team name  
    **Expected result**:
    - Should redirect to /teams (**Status**: ✅)
    - Should display the newly added team, with escaped characters (e.g. \<b\>team name\</b\> should be displayed as is, not with “team name” in bold font) (**Status**: ✅)
  - **Task \#10.3**: Try to inject SQL in the field (Drop the table teams)  
    **Expected result**: Should drop the table teams and all the data it contains (**Status**: ✅)
  - **Task \#10.4**: Try to insert a valid name  
    **Expected result**: Should redirect to /teams and display the newly created team. (**Status**: ✅)

- **Task \#11:** Add an employee to a team (**/employee/:id/add_to_team**)
  - **Task \#11.1:** Click on the Team dropdown.  
    **Expected result:** Should display all teams created (**Status**: ✅)
  - **Task \#11.2:** Select a team from the teams options  
    **Expected result:** Should put the selected option in the input (**Status**: ✅)
  - **Task \#11.3:** Click on “Add Button”  
    **Expected result:** Should redirect to employee/:id (**Status**: ✅)
  - **Task \#11.4:** Go to **(/teams)** and click “view members” on the team where the employee was added  
    **Expected result:** Should display the added employee (**Status**: ✅)

- **Task \#12:** Remove employee from team
  - **Task \#12.1:** Go to employee team edit page (/employee/:id/add_to_team)  
    **Expected result:** Should display a \<select\> input with every team and a “no team” option (**Status**: ✅)
  - **Task \#12.2**: Select “no team” and submit form  
    **Expected result:** User should be removed from the team. (**Status**: ✅)

- **Task \#13: Delete an empty team (/team/delete/:id)**
  - **Task \#13.1:** Click on the delete button from a Team\
    **Expected result:** Should redirect to the /team/delete/:id page (**Status**: ✅)
  - **Task \#13.2:** Click on the Proceed Button.  
    **Expected result:** Should redirect to the /team page and the team selected on the previous step should not be in the table (**Status**: ✅)

- **Task \#14: Delete an non empty team (/team/delete/:id)**
  - **Task \#14.1:** Click on the delete button from a Team\
    **Expected result:** Should redirect to the /team/delete/:id page (**Status**: ❌)
  - **Task \#14.2:** Click on the Proceed Button.  
    **Expected result:**
    * Should redirect to the /team page and the team selected on the previous step should not be in the table (**Status**: ❌)
    * Should not delete the employees from the Team that is being deleted (**Status**: ❌)

- **Task \#15: Delete an employee (/employee/delete/:id)**
  - **Task \#15.1:** On the /employee page click on the “Delete” button of the employee you want to delete.  
    **Expected result:** Should redirect to the employee/delete/:id page where the information of the employee is displayed (eg. name and email) (**Status**: ❌)
  - **Task \#15.2:** Click on the “Proceed” button”  
    **Expected result:** Should redirect to the /employee page where the selected employee to delete in step 12.1 should not appear. (**Status**: ✅)

- **Task \#16: Reset Database (/reset_db)**
  - **Task \#16.1: Click on the reset database button on the Home**\
    **Expected result:** Should redirect to the /reset_db page (**Status**: ✅)
  - **Task \#16.2:** Click on the “Proceed” button”  
    **Expected result:** Should redirect to the Home. (**Status**: ✅)
  - **Task \#16.3**: Check employees (/employess)  
    **Expected result**: Should show no employee (**Status**: ✅)
  - **Task \#16.4**: Check teams (/teams)  
    **Expected result:** Should show no team (**Status**: ✅)
