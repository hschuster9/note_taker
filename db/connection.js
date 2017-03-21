const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  title: String,
  body: String
}
})

mongoose.model('Note', NoteSchema)

mongoose.connect('mongodb://localhost/note_taker_db', err =>{
  if(err){
    console.log(err)
  }
  else {
    console.log("Connected to MongoDB!")
  }
})

module.exports = mongoose
