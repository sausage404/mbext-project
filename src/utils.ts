import { execSync } from "child_process";
import template from "./module/template";
import * as fs from 'fs-extra';
import * as path from 'path';

export async function getDependencyVersions(dependencies: string[], gameType: string) {
    console.log('Please wait, loading module versions...');
    return Promise.all(dependencies.map(async (dependency) => {
        const versions = JSON.parse(
            execSync(`npm view ${dependency} versions --json`).toString()
        ) as string[];
        const filteredVersions = versions.filter(v => {
            const isStable = gameType === 'stable'
            if (template.dependencies.plugins.includes(dependency))
                return isStable ? !v.includes('preview') : v.includes('preview');
            else if (template.dependencies.modules.includes(dependency))
                return isStable ? v.includes('stable') : v.includes('preview');
            else
                return true;
        }).sort((a, b) => b.localeCompare(a, undefined, {
            numeric: true, sensitivity: 'base'
        }));

        return {
            name: dependency,
            choices: filteredVersions
        };
    }));
}

export function getFiles(dir: string) {
    let results = [];

    try {
        const list = fs.readdirSync(dir);

        for (const file of list) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                results = results.concat(getFiles(filePath));
            } else if (stat.isFile()) {
                results.push(filePath);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error.message);
    }

    return results;
}

export const getJsons = {
    manifest: () => JSON.parse(fs.readFileSync("manifest.json", "utf8")) as typeof template.manifest,
    tsconfig: () => JSON.parse(fs.readFileSync("tsconfig.json", "utf8")) as typeof template.tsconfig,
    package: () => JSON.parse(fs.readFileSync("package.json", "utf8")) as typeof template.package
}