const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteSchema = new Schema({
  user_id: {
    type: String,
  },
  user_tag: {
    type: String,
    required: true
  },
  vote_id: {
    type: String,
    required: true
  },
  vote_tag: {
    type: String,
    required: true
  },
  votedAt: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  vote: {
    type: String,
    required: true
  },
  createdBy: {
    type: String
  }
})

module.exports = mongoose.model("Vote", voteSchema)