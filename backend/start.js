import { exec } from 'child_process';
import path from 'path';

// List of subfolders to run `npm install` in
const subfolders = [
    'api/gateway',
    'services/user',
    'services/llm'
];

subfolders.forEach(folder => {
    exec(`cd ${folder} && npm install`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error installing ${folder}:`, stderr);
        } else {
            console.log(`Successfully installed dependencies in ${folder}:\n`, stdout);
        }
    });
});