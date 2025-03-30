import path from "path";
import convertPngToHide from "./hide";
import convertHideToPng from "./unhide";
import { getFiles } from "../../../lib/utils";

export default async function convertTextures(conversion: boolean): Promise<void> {
    const files = getFiles(path.resolve(process.cwd(), "textures"));
    const targetFiles = files.filter(file => file.endsWith(".png"));

    console.log(`Found ${targetFiles.length} ${conversion ? "PNG" : "Hide"} files to convert.`);

    let successCount = 0;
    let failureCount = 0;

    for (const file of targetFiles) {
        const success = conversion
            ? await convertPngToHide(file)
            : await convertHideToPng(file);

        if (success) {
            successCount++;
            console.log(`Successfully converted: ${path.basename(file)}`);
        } else {
            failureCount++;
            console.error(`Failed to convert: ${path.basename(file)}`);
        }
    }

    console.log(`Successfully converted: ${successCount} files`);
    console.error(`Failed to convert: ${failureCount} files`);
}