import mongoose from 'mongoose';

const DocumentationSchema = new mongoose.Schema({
  repositoryUrl: {
    type: String,
    required: true,
  },
  generatedDocs: {
    type: String,
    required: true,
  },
  techStack: {
    languages: [String],
    frameworks: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Documentation', DocumentationSchema);
