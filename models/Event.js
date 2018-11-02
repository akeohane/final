var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    name: String,
    date: String,
    attendees: Array,
    time: Number,
    type: String,
    locationAprox: String,
    actualLocation: String,
    hostId: String,
    interests: Array,
    Description: String,
    eventPhoto: String
  });

  module.exports = mongoose.model('Event', EventSchema);