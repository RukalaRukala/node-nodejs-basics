import {dirname} from "path";
import {fileURLToPath} from "url";
import fs from "fs/promises";

const rename = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const initFile = [__dirname, '/files/wrongFilename.txt'].join('');
    const newFile = [__dirname, '/files/properFilename.md'].join('');
    const isNewFileExists = await fs.access(newFile).then(() => true).catch(() => false);
    const isInitFileExists = await fs.access(initFile).then(() => true).catch(() => false);
    try {
        isInitFileExists && !isNewFileExists
            ? await fs.rename(initFile, newFile)
                .then(() => console.log('File rename successfully'))
            : await Promise.reject(new Error('FS operation failed:'))
    } catch (err) {
        !isInitFileExists
            ? console.error(err + '\nfile "wrongFilename.txt" does not exist')
            : console.error(err + '\nfile "properFilename.md" already exist')
    }
};

await rename();