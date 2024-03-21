const mongoose = require('mongoose')
const moongoose = require('moongoose')

const SelectOption = mongoose.model('SelectOption', {
  date: {
    type: String,
  },
  item: {
    type: String,
  },
})
module.exports = SelectOption
