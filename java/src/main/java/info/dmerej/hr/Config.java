package info.dmerej.hr;

import java.io.IOException;
import java.util.Properties;

public class Config {
    public static final String PROPERTIES = "tests.properties";
    private final Properties properties;
    private String letter;
    private String group;

    public Config() {
        properties = new Properties();
    }

    private String getValue(String key) {
        var value = properties.getProperty(key);
        if (value == null) {
            var message = "Missing '" + key + "' in " + PROPERTIES;
            throw new RuntimeException(message);
        }
        return value;
    }

    public void load() {
        var stream = getClass().getClassLoader().getResourceAsStream(PROPERTIES);
        try {
            properties.load(stream);
        } catch (IOException e) {
            throw new RuntimeException("Could not load tests.properties: " + e);
        }

        letter = getValue("letter");
        group = getValue("group");
    }

    public String baseUrl() {
        return "https://" + letter + "." + group + ".hr.dmerej.info";
    }

    public String databaseUser() {
        return group + "-" + letter;
    }

    public String databaseUrl() {
        var database = databaseUser();
        return "jdbc:postgresql://hr.dmerej.info/" + database;
    }
}
