const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  currentPage: Number,
  totalPages: Number,
  completed: Boolean
})

//what does this do
const Book = mongoose.model('Book', bookSchema)

module.exports = Book
