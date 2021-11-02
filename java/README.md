# Java tests

## Configuration

Create a a proerties file in `src/test/resources/tests.properties` containing your group and the first
letter of your team, like this:

```
group=i3
letter=a
```

## Running the end to end tests

```
./mvnw test -Dtest="info.dmerej.hr.end_to_end.**"
```

## Using playwright code generation

```
$ ./mvnw exec:java -e -D exec.mainClass=info.dmerej.hr.end_to_end.RunCodeGen
```

## Running the integration tests

```
./mvnw test -Dtest="info.dmerej.hr.integration.**"
```
