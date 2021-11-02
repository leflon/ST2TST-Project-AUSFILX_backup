# Python tests

## Configuration

Create a `.env` file containing your group and the first
letter of your team, like this:

```
GROUP=i3
LETTER=a
```

## Installing dependencies

```
python -m venv .venv --prompt hr-db
source .venv/bin/activate
pip install -r requirements.txt
```

## Running the end to end tests

```
pytest end_to_end/
```

## Using playwright code generation

```
playwright codegen
```

## Running the integration tests

```
pytest integration/
```
