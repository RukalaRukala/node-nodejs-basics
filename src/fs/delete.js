import {dirname} from "path";
import {fileURLToPath} from "url";
import fs from "fs/promises";

const remove = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const deletedFile = [__dirname, '/files/fileToRemove.txt'].join('');
    const isDeletedFileExists = await fs.access(deletedFile).then(() => true).catch(() => false);
    try {
        isDeletedFileExists
            ? await fs.unlink(deletedFile)
                .then(() => console.log('File remove successfully'))
            : await Promise.reject(new Error('FS operation failed:\nfile "fileToRemove.txt" does not exist'))
    } catch (err) {
        console.error(err);
    }
};

await remove();