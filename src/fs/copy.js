import {fileURLToPath} from "url";
import fs from "fs/promises";
import * as path from "path";

const copy = async () => {
    try {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const __folderCopy= path.join(__dirname, '/files_copy');
        const __folderInit = path.join(__dirname, '/files')

        const isFolderCopyExists = await fs.access(__folderCopy)
            .then(() => true)
            .catch(() => false);

        if (isFolderCopyExists) {
            throw new Error('FS operation failed: Folder already exists');
        }

        await fs.mkdir(__folderCopy)
        const files = await fs.readdir(__folderInit);

        const copyPromises = files.map(async (file) => {
            const filePath = path.join(__folderInit, file);
            const stats = await fs.stat(filePath);

            if (stats.isFile()) {
                await fs.copyFile(filePath, path.join(__folderCopy, file));
            }
        });

        await Promise.all(copyPromises);

        console.log('Folder created successfully');
    }
    catch (error) {
        console.error(error.message);
    }
};

await copy();
