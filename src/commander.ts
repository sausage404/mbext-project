import { program } from "commander";
import init from "./cmd/init";
import { colorlog } from "./lib/utils";
import compile from "./cmd/compile";
import { execSync } from "child_process";
import update from "./cmd/update";
import { constant } from "@mbext/common";
import template from "./module/template";

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
    .option("-o, --original", "No rebuild")
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
    .option("-a, --all", "update all")
    .action((response) => {
        if (response.all)
            execSync(`npm update -g ${template.dependencies.compiler} --save-dev`, { cwd: process.cwd() });
        update().catch((error) => {
            colorlog.error('Failed to update project');
            console.error(error);
            process.exit(1);
        });
    });

program.parse(process.argv);