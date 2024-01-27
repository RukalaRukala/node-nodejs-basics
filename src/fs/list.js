import {dirname} from "path";
import {fileURLToPath} from "url";
import fs from "fs/promises";

const list = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const folder = [__dirname, '/files'].join('');
    try {
        await fs.access(folder);
        const filesName = await fs.readdir(folder)

        console.log('Имена файлов в папке:\n' + filesName.join('\n'))
    } catch (err) {
        console.error('FS operation failed:\n' + err);
    }
};

await list();