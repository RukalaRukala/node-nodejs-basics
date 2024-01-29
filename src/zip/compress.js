import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";
import * as zlib from "zlib";

const compress = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const initFile= path.join(__dirname, '/files/fileToCompress.txt');
    const zipFile= path.join(__dirname, '/files/archive.gz');

    fs.readFile(initFile, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const inputBuffer = Buffer.from(data, 'utf-8');

        zlib.gzip(inputBuffer, (err, zipBuffer) => {
            if (err) {
                console.error('Error compressing the data:', err);
                return;
            }

            fs.writeFile(zipFile, zipBuffer, (err) => {
                if (err) {
                    console.error('Error writing the compressed file:', err);
                    return;
                }
                console.log('File compressed successful:', zipFile);
            });
        });
    });
};

await compress();