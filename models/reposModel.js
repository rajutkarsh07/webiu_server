const mongoose = require('mongoose');

const reposSchema = new mongoose.Schema({
  repoName: {
    type: String,
  },

  verified: {
    type: Boolean,
    default: true,
  },
});

const Repos = mongoose.model('Repos', reposSchema);
module.exports = Repos;
