import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as path from 'path';
import inquirer from "inquirer";
import { execSync } from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import { getDependencyVersions } from '../utils';
import question from '../module/behavior';
import template from '../module/template';
import ora from 'ora';

export default async () => {
    const answers = await inquirer.prompt(question.init);
    const dependencies = await getDependencyVersions(answers.dependencies, answers.gameType);
    const dependencyVersions = await inquirer.prompt(
        dependencies.map(({ name, choices }) => ({
            type: 'list',
            name,
            message: `Which ${name} version would you like to use?`,
            choices
        }))
    );

    const isTypeScript = answers.language === 'typescript';
    const projectPath = path.resolve(process.cwd(), answers.projectName + "-bp");
    const spinner = ora("Please wait, creating project...").start();

    await fs.ensureDir(projectPath);
    await createProjectFiles(projectPath, answers, dependencyVersions, isTypeScript);
    execSync(`npm install -D ${template.dependencies.compiler.join(" ")} ${answers.addons.join(" ")} --legacy-peer-deps`, { cwd: projectPath });
    execSync(`npm install --legacy-peer-deps`, { cwd: projectPath });

    spinner.stop();

    console.log(
        `${chalk.green('✔')} ${chalk.bold('Project created successfully!')}
        
To get started:
 ${chalk.cyan(`code ${answers.projectName}-bp`)}
 ${chalk.cyan('npm run dev')}`
    );
}

async function createProjectFiles(projectPath: string, answers: Record<string, any>, modules: Record<string, string>, isTypeScript: boolean) {
    const packages = {
        name: path.basename(projectPath),
        ...template.package,
        devDependencies: Object.fromEntries(answers.dependencies.map(dep =>
            [dep, `^${modules[dep]}`]
        ))
    };
    await fs.writeJson(path.join(projectPath, 'package.json'), packages, { spaces: 2 });

    if (isTypeScript) {
        await fs.writeJson(path.join(projectPath, 'tsconfig.json'), template.tsconfig, { spaces: 2 });
    }

    await fs.ensureDir(path.join(projectPath, 'src'));
    await fs.writeFile(path.join(projectPath, `/src/index.${isTypeScript ? 'ts' : 'js'}`), '');

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
        dependencies: Object.entries(modules)
            .filter(([name]) => template.dependencies.modules.includes(name))
            .map(([name, version]) => ({
                module_name: name,
                version: version.includes('beta') ? `${version.split('-')[0]}-beta` : version.split('-')[0],
            })),
        metadata: {
            ...template.manifestBP.metadata,
            authors: answers.authorName.split(',').map(author => author.trim())
        }
    };

    await fs.writeJson(path.join(projectPath, 'manifest.json'), manifest, { spaces: 2 });
    await fs.copy(
        path.join(__dirname, '..', 'assets', 'pack_icon.png'),
        path.join(projectPath, 'pack_icon.png')
    );
    await fs.copy(
        path.join(__dirname, '..', 'assets', 'webpack', `webpack.${isTypeScript ? 'ts' : 'js'}`),
        path.join(projectPath, 'webpack.config.js')
    )
}