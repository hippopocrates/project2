const express = require('express')
const router = express.Router()
const Book = require('../models/library.js')

router.get('/seed', (req, res) => {
  Book.create([
    {
      title: "Poirot Investigates",
      author: "Agatha Christie",
      currentPage: 0,
      totalPages: 192,
      completed: false
    },
    {
      title: "Jonathan Strange & Mr Norrell",
      author: "Susanna Clarke",
      currentPage: 0,
      totalPages: 782,
      completed: false
    },
    {
      title: "The Lady of the Rivers",
      author: "Philippa Gregory",
      currentPage: 8,
      totalPages: 435,
      completed: false
    },
    {
      title: "The Once and Future King",
      author: "T.H. White",
      currentPage: 0,
      totalPages: 656,
      completed: true
    },
    {
      title: "Neverwhere",
      author: "Neil Gaiman",
      currentPage: 0,
      totalPages: 464,
      completed: true
    },
  ])
})

router.get('/', (req, res) => {
  Book.find({}, (error, allBooks) => {
    res.render('index.ejs', {
      books: allBooks
    })
  })
})

router.get('/new', (req, res) => {
  res.render('new.ejs')
})

router.get('/:id', (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    res.render(
      'show.ejs',
      {
        book: foundBook
      }
    )
  })
})

router.get('/:id/edit', (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    res.render(
      'edit.ejs',
      {
        book: foundBook
      }
    )
  })
})

router.post('/', (req, res) => {
  Book.create(req.body, (err, createdBook) => {
    res.redirect('/library')
  })
})

router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
    res.redirect('/library')
  })
})

router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/library')
  })
})

module.exports = router
