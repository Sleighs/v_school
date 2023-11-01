const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typesArray = ["jedi", "sith"];

const bountySchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  living: {
    type: Boolean,
    required: true
  },
  bounty: Number,
  type: {
    type: String,
    enum: typesArray
  },
  id: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Bounty', bountySchema);
