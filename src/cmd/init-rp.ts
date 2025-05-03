import inquirer from "inquirer";
import resource from "../module/resource";
import template from "../module/template";
import * as fs from "fs-extra";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import ora from "ora";
import chalk from "chalk";

export default async () => {
    const answers = await inquirer.prompt(resource);

    const projectPath = path.resolve(process.cwd(), answers.projectName);
    const spinner = ora("Please wait, creating project...").start();

    await fs.ensureDir(projectPath);
    await fs.ensureDir(path.join(projectPath, 'textures'));
    await createProjectFiles(projectPath, answers);

    spinner.stop();

    console.log(`${chalk.green('✔')} ${chalk.bold('Project created successfully!')}`)
}

async function createProjectFiles(projectPath: string, answers: Record<string, any>) {
    const manifest = {
        ...template.manifestBP,
        header: {
            ...template.manifestBP.header,
            name: answers.projectName,
            description: answers.projectDescription,
            uuid: uuidv4(),
            min_engine_version: answers.minimumEngineVersion.split('.').map(Number)
        },
        modules: [
            {
                ...template.manifestBP.modules[0],
                uuid: uuidv4()
            }
        ],
        metadata: {
            ...template.manifestBP.metadata,
            authors: answers.authorName.split(',').map(author => author.trim())
        }
    } as typeof template.manifestRP;

    await fs.writeJson(path.join(projectPath, 'manifest.json'), manifest, { spaces: 2 });
    await fs.copy(
        path.join(__dirname, '..', 'assets', 'pack_icon.png'),
        path.join(projectPath, 'pack_icon.png')
    );
}