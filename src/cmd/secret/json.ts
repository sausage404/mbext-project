import fs from "fs-extra";
import { getFiles } from "../../utils";

function unicodeEscape(str: string): string {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        const char = str[i] + str[i + 1];
        const charCode = str.charCodeAt(i);
        if (char === "\\n") {
            result += "\\n";
            i++;
        } else {
            result += "\\u" + ("0000" + charCode.toString(16)).slice(-4);
        }
    }
    return result;
}

function obfuscateString(str: string): string {
    return str.replace(/"[^\"]*"/g, (match) => {
        const cleanString = match.replace(/["]+/g, '');
        return '"' + unicodeEscape(cleanString) + '"';
    });
}

function obfuscate(jsonObject: Object): string {
    const jsonString = JSON.stringify(jsonObject, null, 4);
    return obfuscateString(jsonString);
}

export default function convertJSON(status: boolean) {
    const files = getFiles(process.cwd());

    for (const file of files) {
        if (!file.endsWith(".json"))
            continue;

        if (status) {
            const data = fs.readJSONSync(file);
            fs.writeFileSync(file, obfuscate(data));
        } else {
            const data = fs.readJSONSync(file);
            fs.writeFileSync(file, JSON.stringify(data, null, 4));
        }

    }
}