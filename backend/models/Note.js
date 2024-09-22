import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  title: { type: String, required: true },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Note', noteSchema);
