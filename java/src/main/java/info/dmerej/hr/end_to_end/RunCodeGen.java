package info.dmerej.hr.end_to_end;

import com.microsoft.playwright.CLI;
import info.dmerej.hr.Config;

import java.io.IOException;

public class RunCodeGen {
    public static void main(String[] origArgs) throws IOException, InterruptedException {
        var config = new Config();
        config.load();

        var baseUrl = config.baseUrl();

        var args = new String[]{
            "codegen",
            baseUrl,
        };

        CLI.main(args);
    }
}
