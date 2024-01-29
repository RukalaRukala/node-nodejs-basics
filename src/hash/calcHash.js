import { createHash } from 'node:crypto';
import fs from "node:fs";
import path from "path";
import {fileURLToPath} from "url";

const calculateHash = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const file= path.join(__dirname, '/files/fileToCalculateHashFor.txt');
    const hash = createHash('sha256');
    const stream = fs.createReadStream(file);

    const calculate = await new Promise((resolve, reject) => {
        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        stream.on('end', () => {
            const sha256Hash = hash.digest('hex');
            resolve(sha256Hash);
        });

        stream.on('error', (error) => {
            reject(error);
        });
    });
    console.log(calculate)
};

await calculateHash();