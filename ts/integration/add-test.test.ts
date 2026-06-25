import { afterAll, beforeAll, expect, test } from "vitest";
import axios from "axios";
import { Client } from "pg";
import { letter, group, baseUrl } from "../config";

test("adding a team", async () => {
  const user = `${group}-${letter}`;
  const databaseOptions = {
    user,
    password: user,
    database: user,
    host: "hr.dmerej.info",
    port: 5432,
  };
  console.log(`Using database options: ${JSON.stringify(databaseOptions)}`)

  // Add a new team using the Web API
  const params = new URLSearchParams();
  params.append("name", "Typescript devs");
  const url = `${baseUrl}/add_team`;
  
  await axios.post(url, params);

  // Check the team has been added in the database
  const pgClient = await new Client(databaseOptions).connect();
  const { rows } = await pgClient.query("SELECT name FROM hr_team");
  const teams = rows.map((row) => row.name);
  expect(teams).toEqual(["devs"]);
  await pgClient.end();
});
