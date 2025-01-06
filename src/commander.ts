import { program } from "commander";
import init from "./cmd/init";
import { colorlog } from "./lib/utils";
import compile from "./cmd/compile";
import { execSync } from "child_process";
import update from "./cmd/update";
import template from "./module/template";
import convertTextures from "./cmd/secret/textures";
import convertJSON from "./cmd/secret/json";

program
    .name("Minecraft Bedrock Project")
    .description("This is a tools setup for a project of minecraft bedrock")

program
    .command("init")
    .description("Create a new project in the current directory")
    .action(() => init()
        .catch((error) => {
            colorlog.error('Failed to create project');
            console.error(error);
            process.exit(1);
        })
    );

program
    .command("compile")
    .description("Compile the project")
    .option("-o, --original", "Cancel rebuild and compile the original project files")
    .action((response) => {
        if (!response.original)
            execSync("npm run build", { cwd: process.cwd() });
        compile().catch((error) => {
            colorlog.error('Failed to compile project');
            console.error(error);
            process.exit(1);
        });
    });

program
    .command("update")
    .description("Update the project")
    .option("-a, --all", "Update all packages bundled with the project")
    .action((response) => {
        if (response.all)
            execSync(`npm update ${template.dependencies.compiler.join(" ")}`, { cwd: process.cwd() });
        update().catch((error) => {
            colorlog.error('Failed to update project');
            console.error(error);
            process.exit(1);
        });
    });

program
    .command("secret")
    .option("-t, --textures", "Adjust secret texture")
    .option("-j, --json", "Adjust secret json")
    .option("-s, --status <status>", "Adjust secret status")
    .action((response) => {
        if (!(response.image || response.json) && !response.status)
            throw new Error("Please specify at least one of --image, --json or --status");

        let status: boolean = false;
        if (response.status === "true")
            status = true;
        else if (response.status === "false")
            status = false;
        else
            throw new Error("Please specify a valid value for --status (true or false)");

        if (response.image)
            convertTextures(status)

        if (response.json)
            convertJSON(status);
    });
program.parse(process.argv);