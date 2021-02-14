const mongoose = require('mongoose');

const SuggestedTLTASchema = new mongoose.Schema({
  question: {
    type: String,
    requird: true,
  },
  answer: {
    simpleDefinition: String,
    analogy: String,
    realWorldExample: String,
  },
  name: String,
});

module.exports = mongoose.model('suggestedTLTASchema', SuggestedTLTASchema);
