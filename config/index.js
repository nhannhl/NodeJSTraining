import fs from 'fs';
export default {
    'port': 3005,
    'mongoUrl': 'mongodb://localhost:27017/nodejs_training',
    'bodyLimit': '100kb',
    'secretKey': async () => {
        return new Promise((resolve, reject) => {
            fs.readFile('./config/private.key', (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    },
    'publicKey': async () => {
        return new Promise((resolve, reject) => {
            fs.readFile('./config/public.key', (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    },
    'saltRound': 10
}