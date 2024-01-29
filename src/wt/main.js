import * as os from "os";
import { Worker } from 'worker_threads';
import path from "path";
import {fileURLToPath} from "url";

const performCalculations = async () => {
    try {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const workerPath= path.join(__dirname, '/worker.js');
        const numCores = os.cpus().length;
        const results = new Array(numCores);

        const createWorker = (workerIndex, n) => {
            return new Promise((resolve, reject) => {
                const worker = new Worker(workerPath, { workerData: n });

                worker.on('message', (result) => resolve(result));

                worker.on('error', (error) => {
                    console.error(`Worker ${workerIndex} error:`, error);
                    reject(error);
                });
            });
        };

        for (let i = 0; i < numCores; i++) {
            results[i] = await createWorker(i, 10 + i)
        }
        console.log('Results:', results);
    } catch (error) {
        console.error('Error:', error);
    }
};

await performCalculations();