import {dirname} from "path";
import {fileURLToPath} from "url";
import fs from "fs/promises";

const read = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const readableFile = [__dirname, '/files/fileToRead.txt'].join('');
    try {
        await fs.access(readableFile);
        const inner = await fs.readFile(readableFile);

        console.log(inner.toString());
    } catch (err) {
        console.error('FS operation failed:\n' + err);
    }
};

await read();