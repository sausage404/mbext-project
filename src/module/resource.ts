import { UnnamedDistinctQuestion } from "inquirer/dist/commonjs/types";
import template from "./template";
import { getJsons } from "../utils";

type Question = (UnnamedDistinctQuestion<{
    [x: string]: any;
}> & {
    name: string;
})[]

export default [{
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
}] satisfies Question