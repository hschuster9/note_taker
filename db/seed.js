const mongoose = require('./connection')
const seedData = require('./seeds')

const Note = mongoose.model('Note')

Note.remove({}).then(function(){
  Note.collection.insert(seedData).then(function(){
    process.exit()
  })
})
