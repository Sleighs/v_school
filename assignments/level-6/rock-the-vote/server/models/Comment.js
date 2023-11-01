const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  issue_tag: {
    type: String,
    required: true,
  },
  vote_tag: {
    type: String,
  },
  parent_tag: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  dateSubmitted: {
    type: String,
    required: true,
  },
  upVotes: {
    type: Number,
  },
  downVotes: {
    type: Number,
  },
  edited: {
    type: Boolean,
  }
});

module.exports = mongoose.model("Comment", commentSchema);