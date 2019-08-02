const mongoose = require("mongoose")

const WebHookSchema = new mongoose.Schema({
  hookid: {
    type: String,
    required: true
  },
  basicDetails: {
    url: {
      type: String
    },
    protocol: {
      type: String,
      enum: ["http", "https"]
    },
    method: {
      type: String
    }
  },
  body: {
    type: Object
  },
  params: {
    type: Object
  },
  query: {
    type: Object
  },
  header: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("WebHook", WebHookSchema)
