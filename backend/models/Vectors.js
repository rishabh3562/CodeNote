const { mongoose } = require('../core/mongodb.js');
const { Schema } = mongoose;

const vectorSchema = new Schema({
    repoId: { type: String }, // ID of the repository
    filePath: { type: String }, // Path to the file}
    vector: { type: Array, default: [] }, // Vector representation of the file
});

module.exports = mongoose.model('Vector', vectorSchema)