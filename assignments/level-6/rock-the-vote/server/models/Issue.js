const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  id: {
    type: String,
    required: true
  },
  issue_tag: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    //required: true
  },
  updatedAt: {
    type: String,
    //required: true
  }
})

module.exports = mongoose.model("Issue", issueSchema)