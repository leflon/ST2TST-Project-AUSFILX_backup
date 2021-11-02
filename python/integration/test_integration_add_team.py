import httpx
from urllib.parse import urljoin
import psycopg


def test_add_team(base_url: str, database_url: str):
    # Create a new team named 'devs' using the web API
    url = urljoin(base_url, "add_team")
    response = httpx.post(url, follow_redirects=True, data={"name": "devs"})
    response.raise_for_status()

    # Check that the team is present in the database
    with psycopg.connect(database_url) as connection:
        cursor = connection.cursor()
        rows = cursor.execute("SELECT name FROM hr_team").fetchall()
        teams = [row[0] for row in rows]
        assert teams == ["devs"]
