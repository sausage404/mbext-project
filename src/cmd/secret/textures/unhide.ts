import * as fs from "fs-extra";
import { PNG } from "pngjs";

export default async function convertHideToPng(file: string): Promise<boolean> {
  try {
    const buffer = await fs.readFile(file);
    const width = buffer.readUInt16LE(12);
    const height = buffer.readUInt16LE(14);
    const imageType = buffer.readUInt8(2);
    const bitsPerPixel = buffer.readUInt8(16);

    if (imageType !== 2 || bitsPerPixel !== 32) {
      throw new Error("Unsupported Hidden format. Only 32-bit uncompressed true-color images are supported.");
    }

    const png = new PNG({ width, height });

    // Convert image data
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const hideIndex = 18 + ((height - 1 - y) * width + x) * 4;
        const pngIndex = (y * width + x) * 4;

        png.data[pngIndex] = buffer[hideIndex + 2];     // Red
        png.data[pngIndex + 1] = buffer[hideIndex + 1]; // Green
        png.data[pngIndex + 2] = buffer[hideIndex];     // Blue
        png.data[pngIndex + 3] = buffer[hideIndex + 3]; // Alpha
      }
    }

    const pngBuffer = PNG.sync.write(png);
    await fs.writeFile(file, pngBuffer);
    return true;
  } catch (error) {
    console.error(`Error converting ${file} to PNG: ${error}`);
    return false;
  }
}