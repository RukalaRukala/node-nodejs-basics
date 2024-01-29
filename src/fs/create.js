import fs from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
    try {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const __filename = [__dirname, '/files/fresh.txt'].join('');
        const isFileExists = await fs.access(__filename).then(() => true).catch(() => false);

        isFileExists
            ? await Promise.reject(new Error('FS operation failed:\nFile already exists'))
            : await fs.writeFile(__filename, 'I am fresh and young')
                .then(() => console.log('Folder created successfully'))
    } catch (error) {
        console.error(error.message);
    }
};

await create();