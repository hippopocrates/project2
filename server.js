const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const Book = require('./models/library.js')

app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(methodOverride('_method'))

const bookController = require('./controllers/library.js')
app.use('/library', bookController)


app.listen(3000, () => {
  console.log('listening...')
})

//what exactly does this do?
mongoose.connect('mongodb://localhost:27017/library', {useNewUrlParser:true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
