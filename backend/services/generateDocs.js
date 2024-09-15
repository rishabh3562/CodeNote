const { parseCode } = require('./codeParser');
const { generateMarkdownFromContext } = require('./langchainService');
const Doc = require('../models/Docs');

const generateAndStoreDocs = async (repoId, repoPath) => {
    const files = await parseCode(repoPath);

    for (const file of files) {
        const context = {
            functions: file.functions,
            states: file.states,
            actions: file.actions
        };
        const markdownContent = await generateMarkdownFromContext(context);

        await Doc.updateOne(
            { repoId, filePath: file.filePath },
            { content: markdownContent, updatedAt: new Date() },
            { upsert: true }
        );
    }
};

module.exports = { generateAndStoreDocs };
