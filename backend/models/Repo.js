const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  commitHashes: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Repo', repoSchema);
