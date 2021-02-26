const {Schema, model } = require('mongoose')

const schema = new Schema({
  label: { type: String, required: true},
  date: { type: Date, default: Date.now},
  done: {type: Boolean, default: false},
  important: {type: Boolean, default: false}
})

module.exports = model('Todo', schema)