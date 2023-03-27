const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    word: {type: String, required: true, unique: true},
    definition: {type: String, required: true},
    difficulty: {type: String, required: true, default: 'normal'}
  });

module.exports = mongoose.model('Word', wordSchema);
