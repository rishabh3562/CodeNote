import mongoose from 'mongoose';

const repoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  commitHashes: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Repo', repoSchema);
