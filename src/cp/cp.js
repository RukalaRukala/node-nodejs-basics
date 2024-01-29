import { spawn } from 'child_process';
import path from "path";
import {fileURLToPath} from "url";

const spawnChildProcess = async (args) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const scriptPath= path.join(__dirname, '/files/script.js');

    const childProcess = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit'],
    });

    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    childProcess.on('error', (error) => {
        console.error(`Child process error: ${error.message}`);
    });

    childProcess.on('exit', (code) => {
        console.log(`Child process finished with code ${code}`);
    });

    process.on('SIGINT', () => {
        console.log('The process has been interrupted. Stream closed.\n');
        process.exit();
    });
};

await spawnChildProcess( ['arg1', 'arg2', 'arg3']);
