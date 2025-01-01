import { UnnamedDistinctQuestion } from "inquirer/dist/commonjs/types";
import template from "./template";
import { getJsons } from "../lib/utils";

type Question = (UnnamedDistinctQuestion<{
    [x: string]: any;
}> & {
    name: string;
})[]

export default {
    init: [{
        type: 'list',
        name: 'language',
        message: 'Which language do you want to use?',
        choices: ['typescript', 'javascript']
    }, {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of the project?',
        validate: input => /^[a-z0-9-]+$/.test(input) || 'Project name may only include lowercase letters, numbers, and hyphens'
    }, {
        type: 'input',
        name: 'projectDescription',
        message: 'What is the description of the project?',
        validate: input => input.length > 0 || 'Project description is required'
    }, {
        type: 'input',
        name: 'authorName',
        message: 'What is the author\'s name? Use commas to separate multiple authors(,).',
        validate: input => input.length > 0 || 'Author name is required'
    }, {
        type: 'input',
        name: 'minimumEngineVersion',
        message: 'What is the minimum engine version required?',
        validate: input => {
            if (input.length === 0) return 'Minimum engine version is required';
            const [major, minor, patch] = input.split('.');
            const response = 'Minimum engine version must be in the format x.x.x';
            return (!isNaN(parseInt(major)) && !isNaN(parseInt(minor)) && !isNaN(parseInt(patch))) || response
        }
    }, {
        type: 'list',
        name: 'gameType',
        message: 'What game type would you like to use?',
        choices: ['stable', 'preview'],
    }, {
        type: 'checkbox',
        name: 'dependencies',
        message: 'Which dependencies would you like to add?',
        default: ['@minecraft/server', '@minecraft/vanilla-data'],
        choices: [
            ...template.dependencies.modules,
            ...template.dependencies.plugins
        ],
        validate: input => input.length > 0 || 'At least one dependency is required'
    }, {
        type: 'checkbox',
        name: 'addons',
        message: 'Which addons would you like to add?',
        choices: template.dependencies.addons,
    }],
    update: () => [{
        type: 'input',
        name: 'minimumEngineVersion',
        message: 'What is the minimum engine version required?',
        default: getJsons.manifest().header.min_engine_version.join('.'),
        validate: input => {
            if (input.length === 0) return 'Minimum engine version is required';
            const [major, minor, patch] = input.split('.');
            return (!isNaN(parseInt(major)) && !isNaN(parseInt(minor)) && !isNaN(parseInt(patch))) || 'Minimum engine version must be in the format x.x.x';
        }
    }, {
        type: 'list',
        name: 'gameType',
        message: 'What game type would you like to use?',
        choices: ['stable', 'preview']
    }, {
        type: 'checkbox',
        name: 'dependencies',
        message: 'Which dependencies would you like to add?',
        default: Object.keys(getJsons.package().devDependencies).filter(dep =>
            [
                ...template.dependencies.plugins,
                ...template.dependencies.modules
            ].includes(dep)
        ),
        choices: [
            ...template.dependencies.modules,
            ...template.dependencies.plugins
        ],
        validate: input => input.length > 0 || 'At least one dependency is required'
    }, {
        type: 'checkbox',
        name: 'addons',
        message: 'Which addons would you like to add?',
        default: Object.keys(getJsons.package().devDependencies).filter(dep =>
            template.dependencies.addons.includes(dep)
        ),
        choices: template.dependencies.addons
    }]
} as {
    init: Question,
    update: () => Question
}