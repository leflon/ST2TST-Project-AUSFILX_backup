package info.dmerej.hr.integration;

import info.dmerej.hr.Config;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class AddTeamIntegrationTests {


    @Test
    void can_create_a_team() {
        var config = new Config();
        config.load();
        var databaseUrl = config.databaseUrl();
        System.out.println("Using database URL: " + databaseUrl);

        // Call the /add_team route
        var client = new OkHttpClient();

        var formBodyBuilder = new FormBody.Builder();
        for (var entry : Map.of("name", "Java devs").entrySet()) {
            formBodyBuilder.add(entry.getKey(), entry.getValue());
        }
        var formBody = formBodyBuilder.build();

        var url = config.baseUrl() + "/add_team";
        var request = new Request.Builder()
            .url(url)
            .post(formBody)
            .build();

        try {
            var response = client.newCall(request).execute();
            assertTrue(response.isSuccessful());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        // Verify the list of teams in the database
        var databaseUser = config.databaseUser();

        try {
            var dbProperties = new Properties();
            dbProperties.setProperty("user", databaseUser);
            dbProperties.setProperty("password", databaseUser);
            var connection = DriverManager.getConnection(databaseUrl, dbProperties);
            var query = "SELECT name FROM hr_team";
            var statement = connection.prepareStatement(query);
            var result = statement.executeQuery();
            var actual = new ArrayList<String>();
            while (result.next()) {
                actual.add(result.getString(1));
            }
            var expected = List.of("Java devs");
            assertEquals(expected, actual.stream().toList());
        } catch (SQLException e) {
            throw new RuntimeException("Could not open DB: " + e);
        }
    }

}
