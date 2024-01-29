import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";
import zlib from "zlib";

const decompress = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const zipFile= path.join(__dirname, '/files/archive.gz');
    const outputFile= path.join(__dirname, '/files/fileToCompress.txt');

    fs.readFile(zipFile, (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const zipBuffer = Buffer.from(data);

        zlib.gunzip(zipBuffer, (err, outputBuffer) => {
            if (err) {
                console.error('Error compressing the data:', err);
                return;
            }

            fs.writeFile(outputFile, outputBuffer, (err) => {
                if (err) {
                    console.error('Error writing the compressed file:', err);
                    return;
                }
                console.log('File decompressed successful:', outputFile);
            });
        });
    });
};

await decompress();