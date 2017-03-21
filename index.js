const express = require('express')
const hbs = require('express-handlebars')
const parser = require('body-parser')
const mongoose = require('./db/connection')

const app = express()

const Note = mongoose.model("Note")

app.set("port", process.env.PORT || 9111)
app.set('view engine', 'hbs')
app.engine(".hbs", hbs({
  extname: ".hbs",
  partialsDir: "views/",
  layoutsDir: "views/",
  defaultLayout: "layout-main"
}))

app.use("/assets", express.static("public"))
app.use(parser.json({extended: true}))

//root url
app.get('/', function(req, res){
  res.render("notes")
})

//show all notes
app.get("/api/notes", function(req, res){
  Note.find({}).then(function(notes){
    res.json(notes)
  })
})

//show individual note
app.get('/api/notes/:title', function(req, res){
  Note.findOne({title: req.params.title}).then(function(note){
    res.json(note)
  })
})

//create note
app.post('/api/notes', function(req, res){
  Note.create(req.body).then(function(note){
    res.json(note)
  })
})

//delete note
app.delete('/api/notes/:title', function(req, res){
  Note.findOneAndRemove({title: req.params.title}).then(function(){
    res.json({success: true})
  })
})

//update note
app.put("/api/notes/:title", function(req, res){
  console.log(req.body);
  Note.findOneAndUpdate({title: req.params.title}, req.body, {new: true}).then(function(note){
    res.json(note)
  })
})

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
