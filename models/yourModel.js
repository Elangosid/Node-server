const mongoose = require('mongoose')

const YourModels = mongoose.model('YourModel', {
  isrc: String,
  month: String,
  song_name: String,
  album_name: String,
  artist_name: String,
  streams: String,
  income: String,
  asset_title: String,
  asset_labels: String,
  artist: String,
  item_artist: String,
  date: String,
  selectOption: String,
})

module.exports = YourModels
