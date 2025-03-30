import * as fs from "fs-extra";
import * as path from "path";
import inquirer from "inquirer";
import { getDependencyVersions, getJsons } from "../lib/utils"
import question from "../module/question";
import template from "../module/template";
import { execSync } from "child_process";

export default async () => {
    const manifest = getJsons.manifest();
    const answers = await inquirer.prompt(question.update());
    const dependencies = await getDependencyVersions(answers.dependencies, answers.gameType);
    const dependencyVersions = await inquirer.prompt(
        dependencies.map(({ name, choices }) => ({
            type: 'list',
            name,
            default: Object
                .entries(getJsons.package().devDependencies)
                .map(([dep, version]) => [dep, version.replace(/^[\^~]/, '')])
                .find(([dep]) => dep === name)?.[1],
            message: `Which ${name} version would you like to use?`,
            choices
        }))
    );
    const dependencyUpdates = Object.entries(dependencyVersions)
        .map(([name, version]) => `${name}@${version}`).concat(answers.addons)
        .join(" ")

    console.log('Updating project in', manifest.header.name);
    await updateProjectFiles(process.cwd(), answers, dependencyVersions);
    execSync(`npm install --save-dev ${dependencyUpdates} ${answers.addons.join(" ")} --legacy-peer-deps`, {
        cwd: process.cwd()
    });
    console.log('Project updated successfully!');
}

async function updateProjectFiles(projectPath: string, answers: Record<string, any>, dependencyVersions: Record<string, string>) {
    const packageJson = {
        name: path.basename(projectPath),
        ...getJsons.package(),
        devDependencies: {
            ...Object.fromEntries(
                Object.entries(getJsons.package().devDependencies)
                    .filter(([dep]) => ![
                        ...template.dependencies.modules,
                        ...template.dependencies.plugins,
                        ...template.dependencies.addons
                    ].includes(dep))
                    .map(([dep, version]) => {
                        if (answers.dependencies.includes(dep)) {
                            return [dep, `^${dependencyVersions[dep]}`]
                        } else {
                            return [dep, version]
                        }
                    })
            )
        }

    };
    await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });

    const manifest = getJsons.manifest();
    const manifestJson: typeof template.manifest = {
        ...manifest,
        header: {
            ...manifest.header,
            min_engine_version: answers.minimumEngineVersion.split('.').map(Number),
        },
        dependencies: Object.entries(dependencyVersions)
            .filter(([name]) => template.dependencies.modules.includes(name))
            .map(([name, version]) => ({
                module_name: name,
                version: version.includes("beta") ? `${version.split("-")[0]}-beta` : version.split("-")[0],
            }))
    }
    await fs.writeJson(path.join(projectPath, 'manifest.json'), manifestJson, { spaces: 2 });
}