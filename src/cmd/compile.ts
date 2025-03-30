import * as fs from "fs-extra";
import archiver from "archiver";
import { getFiles } from "../lib/utils";

export default async () => {
    const cancelled = ['package.json', 'package-lock.json', 'tsconfig.json', 'src', 'node_modules', 'webpack.config.js'];

    const files = getFiles('.').filter(file => !cancelled.some(key => file.includes(key)));

    const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));

    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    const outputStream = fs.createWriteStream(`${manifest.header.name}-${manifest.header.version.join('.')}.zip`);

    return new Promise<void>((resolve, reject) => {
        outputStream.on('close', () => {
            console.log(archive.pointer() + ' total bytes');
            console.log('Archiver has been finalized and the output file descriptor has closed.');
            resolve();
        });

        archive.on('error', (err) => {
            reject(err);
        });

        archive.pipe(outputStream);

        files.forEach(file => {
            archive.file(file, { name: file });
        });

        archive.finalize();
    });
}