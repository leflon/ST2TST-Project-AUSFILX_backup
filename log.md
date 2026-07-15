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