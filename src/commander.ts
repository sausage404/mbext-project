import { program } from "commander";
import { execSync } from "child_process";
import chalk from "chalk";
import compile from "./cmd/compile";
import update from "./cmd/update";
import convertTextures from "./cmd/secret/textures";
import convertJSON from "./cmd/secret/json";
import template from "./module/template";
import initBp from "./cmd/init-bp";
import initRp from "./cmd/init-rp";
import imported from "./cmd/imported";

/**
 * Configure and set up the command-line interface
 */
function setupCLI(): void {
    program
        .name("Minecraft Bedrock Project")
        .description("Tools for Minecraft Bedrock development projects")
        .version(process.env.npm_package_version || "1.0.0");

    // Init command - Create a new project
    program
        .command("init")
        .description("Create a new Minecraft Bedrock project")
        .option("-r, --resource", "Create a resource pack")
        .action((options) => {
            console.log(chalk.blue("Initializing a new Minecraft Bedrock project..."));

            if (!options.resource) {
                initBp()
                    .catch((error) => {
                        console.error(chalk.red("Failed to create project:"));
                        console.error(error);
                        process.exit(1);
                    });
            } else {
                initRp()
                    .catch((error) => {
                        console.error(chalk.red("Failed to create project:"));
                        console.error(error);
                        process.exit(1);
                    });
            }
        });

    // Import command - Import a project from a pack
    program
        .command("import")
        .description("Import a project from a pack (use only bds)")
        .option("-r, --resource", "Import a resource pack")
        .option("-b, --behavior", "Import a behavior pack")
        .action((action) => {
            if (action.resource) {
                imported(false);
            } else if (action.behavior) {
                imported(true);
            } else {
                console.error(chalk.red("Error: Please specify either --resource or --behavior option."));
                process.exit(1);
            }
        })

    // Compile command - Package the project for distribution
    program
        .command("compile")
        .description("Compile the project into a distributable package")
        .option("-o, --original", "Skip rebuild and compile only the original project files")
        .action((options) => {
            console.log(chalk.blue("Compiling project..."));

            if (!options.original) {
                console.log("Running build step first...");
                try {
                    execSync("npm run build", {
                        cwd: process.cwd(),
                        stdio: "inherit"
                    });
                } catch (error) {
                    console.error(chalk.red("Build failed:"));
                    console.error(error);
                    process.exit(1);
                }
            }

            compile().catch((error) => {
                console.error(chalk.red("Failed to compile project:"));
                console.error(error);
                process.exit(1);
            });
        });

    // Update command - Update project dependencies
    program
        .command("update")
        .description("Update project dependencies and configuration")
        .option("-a, --all", "Update all packages bundled with the project")
        .action((options) => {
            if (options.all) {
                console.log(chalk.blue("Updating all compiler packages..."));
                try {
                    execSync(
                        `npm update ${template.dependencies.compiler.join(" ")}`,
                        {
                            cwd: process.cwd(),
                            stdio: "inherit"
                        }
                    );
                } catch (error) {
                    console.error(chalk.red("Failed to update compiler packages:"));
                    console.error(error);
                }
            }

            update().catch((error) => {
                console.error(chalk.red("Failed to update project:"));
                console.error(error);
                process.exit(1);
            });
        });

    // Secret command - Handle obfuscation and special transformations
    program
        .command("secret")
        .description("Obfuscate project assets for protection")
        .option("-t, --textures", "Process texture files")
        .option("-j, --json", "Process JSON files")
        .option("-s, --status <status>", "Set obfuscation mode (true=obfuscate, false=deobfuscate)")
        .action((options) => {
            // Validate options
            if (!(options.textures || options.json)) {
                console.error(chalk.red("Error: Please specify at least one of --textures or --json"));
                process.exit(1);
            }

            if (options.status !== "true" && options.status !== "false") {
                console.error(chalk.red("Error: Please specify a valid value for --status (true or false)"));
                process.exit(1);
            }

            const status = options.status === "true";
            console.log(chalk.blue(`Running secret operations (${status ? "obfuscate" : "deobfuscate"})...`));

            try {
                // Process textures if requested
                if (options.textures) {
                    console.log(chalk.blue("Processing texture files..."));
                    convertTextures(status);
                }

                // Process JSON if requested
                if (options.json) {
                    console.log(chalk.blue("Processing JSON files..."));
                    convertJSON(status);
                }
            } catch (error) {
                console.error(chalk.red("Error during secret operations:"));
                console.error(error);
                process.exit(1);
            }
        });

    // Parse command line arguments
    program.parse(process.argv);

    // Show help if no command was specified
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
}

// Initialize the CLI
setupCLI();