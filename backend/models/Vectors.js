import { mongoose } from '../core/mongodb.js'; // Changed to import
import { Schema } from mongoose;

const vectorSchema = new Schema({
    repoId: { type: String }, // ID of the repository
    filePath: { type: String }, // Path to the file
    vector: { type: Array, default: [] }, // Vector representation of the file
});

export default mongoose.model('Vector', vectorSchema); // Changed to export default