import {Transform} from 'stream';

const transform = async () => {
    class ReverseTransform extends Transform {
        constructor() {
            super();
        }

        _transform(chunk, encoding, callback) {
            const reversedChunk = chunk.toString().split('').reverse().join('') + '\n\n';
            this.push(reversedChunk);
            callback();
        }
    }

    const reverseTransformStream = new ReverseTransform();
    process.stdin.pipe(reverseTransformStream).pipe(process.stdout);

    return  new Promise((resolve, reject) => {
        process.on('SIGINT', () => {
            console.log('\nПроцесс прерван. Поток process.stdin закрыт.');
            process.stdin.end();
            process.exit();
            resolve();
        });

        process.stdin.on('error', (error) => {
            reject(error);
        });
    });
};

await transform();