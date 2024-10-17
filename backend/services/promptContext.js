import babel from '@babel/core';
import fs from 'fs';
import path from 'path';

export const generatePromptContext = async (repoId, repoPath) => {
    const files = getJavaScriptFiles(repoPath);
    const context = {};

    for (const file of files) {
        const code = fs.readFileSync(file, 'utf-8');
        const ast = babel.parseSync(code, {
            filename: file,
            presets: ['@babel/preset-env']
        });
        const fileContext = extractPromptContextFromAST(ast);
        context[file] = fileContext;
    }

    return context;
};

const getJavaScriptFiles = (repoPath) => {
    const jsFiles = [];
    const walkDir = (dir) => {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walkDir(fullPath);
            } else if (file.endsWith('.js')) {
                jsFiles.push(fullPath);
            }
        });
    };

    walkDir(repoPath);
    return jsFiles;
};

const extractPromptContextFromAST = (ast) => {
    // Example logic to extract functions, states, and actions
    return {
        functions: ['functionName'],
        states: ['stateName'],
        actions: ['actionName']
    };
};

// module.exports = { generatePromptContext }; // Remove this line
