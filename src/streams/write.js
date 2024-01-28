import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";

const write = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const file= path.join(__dirname, '/files/fileToWrite.txt');
    const stream = fs.createWriteStream(file);

    return  new Promise((resolve, reject) => {
        process.stdin.setEncoding('utf8');

        process.stdin.on('data', async (data) => {
            stream.write(data);
        });

        process.on('SIGINT', () => {
            console.log('\nПроцесс прерван. Поток process.stdin закрыт.');
            stream.end();
            process.stdin.end();
            process.exit();
            resolve();
        });

        process.stdin.on('error', (error) => {
            reject(error);
        });
    });
};

await write();