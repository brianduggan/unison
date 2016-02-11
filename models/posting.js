var mongoose = require('mongoose');

var PostingSchema = mongoose.Schema({
  game: {type: String},
  location: {type: String},
  locationName: {type: String},
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true});

module.exports = mongoose.model('Posting', PostingSchema);
