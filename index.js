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
app.use(parser.urlencoded({extended: true}))

app.get('/', function(req, res){
  res.render("notes")
})

app.get("/api/notes", function(req, res){
  Note.find({}).then(function(notes){
    res.json(notes)
  });
});



app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
