// Changed to import
import mongoose from 'mongoose';

const vectorSchema = new mongoose.Schema({
  repoId: { type: String }, // ID of the repository
  filePath: { type: String }, // Path to the file
  vector: { type: Array, default: [] }, // Vector representation of the file
});

export default mongoose.model('Vector', vectorSchema); // Changed to export default
