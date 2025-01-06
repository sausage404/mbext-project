import * as fs from "fs-extra";
import { PNG } from "pngjs";
import { colorlog } from "../../../lib/utils";

export default async function convertPngToHide(file: string): Promise<boolean> {
    try {
        const buffer = await fs.readFile(file);
        const png = PNG.sync.read(buffer);
        const hideHeader = Buffer.alloc(18);
        const hideData = Buffer.alloc(png.width * png.height * 4);

        hideHeader.writeInt8(0, 0);          // ID Length
        hideHeader.writeInt8(0, 1);          // Color Map Type
        hideHeader.writeInt8(2, 2);          // Image Type (2 for uncompressed, true-color image)
        hideHeader.writeInt16LE(0, 3);       // First Entry Index
        hideHeader.writeInt16LE(0, 5);       // Color Map Length
        hideHeader.writeInt8(0, 7);          // Color Map Entry Size
        hideHeader.writeInt16LE(0, 8);       // X-origin of Image
        hideHeader.writeInt16LE(0, 10);      // Y-origin of Image
        hideHeader.writeInt16LE(png.width, 12);  // Width of Image
        hideHeader.writeInt16LE(png.height, 14); // Height of Image
        hideHeader.writeInt8(32, 16);        // Image Pixel Size
        hideHeader.writeUInt8(0x20, 17);     // Image Descriptor

        let offset = 0;
        for (let y = png.height - 1; y >= 0; y--) {
            for (let x = 0; x < png.width; x++) {
                const idx = (y * png.width + x) * 4;
                hideData.writeUInt8(png.data[idx + 2], offset++); // Blue
                hideData.writeUInt8(png.data[idx + 1], offset++); // Green
                hideData.writeUInt8(png.data[idx], offset++);     // Red
                hideData.writeUInt8(png.data[idx + 3], offset++); // Alpha
            }
        }
        await fs.writeFile(file, Buffer.concat([hideHeader, hideData]));
        return true;
    } catch (error) {
        colorlog.error(`Error converting ${file} to Hidden format: ${error}`);
        return false;
    }
}