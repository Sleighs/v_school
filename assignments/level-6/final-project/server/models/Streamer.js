const mongoose = require('mongoose')
const Schema = mongoose.Schema

const streamerSchema = new Schema({
  streamer_name: {
    type: String,
    required: true,
    unique: true
  },
  streamer_tag: {
    type: String,
    required: true,
    unique: true
  },
  streamer_id: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  real_name: {
    type: String 
  },
  social_media: {
    type: Array,
  },
  platforms: {
    type: Array,
  },
  logo_url: {
    type: String,
  },
  portrait_url: {
    type: String,
  },
  topics: {
    type: Array,
  },
  segments: {
    type: Array,
  },
  traits: {
    type: Array
  },
  level: { type: Number },
  subscriber_count: { type: Number },
  views_weekly: { type: Number },
  views_monthly: { type: Number },
  views_yearly: { type: Number },
  views_total: { type: Number},
  
  // years/months streaming
  // subscriber count
  // controversy
  // summary
  // viewers - regular
  // viewers - highest total
})

module.exports = mongoose.model("Streamer", streamerSchema)