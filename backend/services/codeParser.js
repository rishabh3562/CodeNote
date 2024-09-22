import babel from '@babel/core';
import fs from 'fs';
import path from 'path';

// Parse code using Babel
export const parseCode = async (repoPath) => {
    const files = getJavaScriptFiles(repoPath);
    const parsedFiles = [];

    for (const file of files) {
        const code = fs.readFileSync(file, 'utf-8');
        const ast = babel.parseSync(code, {
            filename: file,
            presets: ['@babel/preset-env']
        });
        const fileData = extractDocumentationFromAST(ast, file);
        parsedFiles.push(fileData);
    }

    return parsedFiles;
};

// Helper function to get JavaScript files in a repo directory
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

// Extract documentation from AST
const extractDocumentationFromAST = (ast, filePath) => {
    // Here you would implement extraction logic from AST
    // Example structure:
    return {
        filePath,
        functions: [],
        states: [],
        actions: []
    };
};
