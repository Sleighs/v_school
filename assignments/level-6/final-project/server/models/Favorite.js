const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoriteSchema = new Schema({
  user_id: {
    type: String,
  },
  user_tag: {
    type: String,
  },
  streamer_tag: {
    type: String,
    required: true
  },
  favorite_id: {
    type: String,
    required: true
  },
  favorite_tag: {
    type: String,
  },
  updatedAt: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  createdBy: {
    type: String
  }
})

module.exports = mongoose.model("Favorite", favoriteSchema)