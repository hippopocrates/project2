const express = require('express')
const router = express.Router()
const Book = require('../models/library.js')

router.get('/seed', (req, res) => {
  console.log('seed route start');
  Book.create([
    {
      title: "Poirot Investigates",
      author: "Agatha Christie",
      currentPage: 0,
      totalPages: 192,
      completed: false,
      imgSrc: "/img/poirot.jpeg"
    },
    {
      title: "Jonathan Strange & Mr Norrell",
      author: "Susanna Clarke",
      currentPage: 0,
      totalPages: 782,
      completed: false,
      imgSrc: "/img/mrNorrell.jpeg"
    },
    {
      title: "The Lady of the Rivers",
      author: "Philippa Gregory",
      currentPage: 8,
      totalPages: 435,
      completed: false,
      imgSrc: "/img/lady.jpg"
    },
    {
      title: "The Book of Merlin",
      author: "T.H. White",
      currentPage: 0,
      totalPages: 656,
      completed: true,
      imgSrc: "/img/merlin.jpeg"
    },
    {
      title: "Neverwhere",
      author: "Neil Gaiman",
      currentPage: 0,
      totalPages: 464,
      completed: true,
      imgSrc: "/img/neverwhere.jpeg"
    },
  ], (err, data) => {
    res.redirect('/library/')
  })
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
  if(req.body.completed === 'on'){
    req.body.completed = true
  } else {
    req.body.completed = false
  }
  Book.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
    res.redirect('/library/'+req.params.id)
  })
})

router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/library')
  })
})

module.exports = router
