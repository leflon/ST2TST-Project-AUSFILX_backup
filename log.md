# Log

## Part 1 
See our two `test-plan` files.

## Part 2 (2026-07-15 AM)
### Step 2.1 

We're using `TypeScript` to run the tests.

### Step 2.2

We used `codegen` to generate the base of the first `add-employee` test. 
Then we manually added the `expect` statement. 

### Step 2.3 

We added the `update-contract` test manually.

Then we added the `fixtures.ts` file, that automatically resets the Database (`resetDb`) before each test. We added `{auto: true}` so that it runs for *every* test. Finally, we changed the imports in all test files so that they import the fixture, not the bare `test` object from Playwright.

For tests that require a first user in Database, we also added the `withUser` fixture, that gets executed when it is imported along with `page` in the test.

But, since Playwright executes tests in parallel by default, to avoid `resetDb` from one worker to mess with the tests of another worker, we modified `package.json` to add `--workers=1` in the `tests:end-to-end` script, so that there is no parallelism and no risk of our fixtures clashing with each other.

### Step 2.4

We added the following test:
 - Negative zip code in `add-employee`
 - Should not delete users of a team when we delete the team in `delete-team`. We also added the `withTeam` fixture to make this test.
 - Should not allow blank team name: When we input a blank team name, the server returns an HTTP 500 error. Although it *does* prevent blank names from being created, it should still fail because we don't want HTTP 500 errors, we should have proper error message instead.

### Step 2.5
We replaced all code to use the Page Object Model pattern. We started by using it only in the original fixtures we had, before changing all tests to use it. We created exactly one class per page. 

### Step 2.6
The benefit of using POM is clear. It separates the pure HTML manipulations from the test semantics, and allows us to make our test code more DRY. 
In our case, to go full on the POM pattern, we made *one class per page*. For some tests/pages, it's probably overkill and makes the code more complex than it should be, so we feel like to really get the best out of this pattern, we must also be able to estimate which page needs its class, and for which cases it should be okay to just use locators directly in the test.

For example, `ResetDbPage` is probably not useful as the page is really simple. But, at least, if the simple pages evolve into more complex ones, we will already have the associate classes and will be able to make them evolve faster.
 