const parseEnv = () => {
    Object.entries(process.env).forEach(([value, key]) => {
        value.startsWith('RSS_') ? console.log(`${value}=${key}`) : '';
    });
};

parseEnv();