import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";

const read = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const file= path.join(__dirname, '/files/fileToRead.txt');
    const stream = fs.createReadStream(file);

    await new Promise((resolve, reject) => {
        stream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        stream.on('end', () => {
            console.log('\n\n!!!Stream is destroyed!!!')
            stream.destroy();
        });

        stream.on('error', (error) => {
            reject(error);
        });
    });
};

await read();