//this comes right from the getting started section Hello World
//on the expressjs website
const express = require('express')
const app = express()
const port = 4000
//

// Here is a link to the MDN explaining CORS
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
const cors = require('cors')

// Basic idea is that your data will be sent back in separate parts
// and bodyparser is an express middleware that will help put the parts
// back together
// decent article https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90
const bodyParser = require('body-parser')

// Monk is the middleware that allows express and your mongoDB to talk
// you could also use mongoose
const monk = require('monk')
// Put your url from your mongo atlas cluster below
const url = 'add your mongo atlas link here'

// const db is how you set your database path. Here we use monk to 
// talk to our mongo atlas database and console log that there is a connection
// you can remove the console log once you have everything working
const db = monk(url)
  db.then(() => {
    console.log('connected')
  })
// Below we are assigning our database to the variable people
// using db.get(collection name from mongo atlas)
const people = db.get('Senetors.Senetors_Collection')

// We will use cors and bodyparser to be able to get the data back
// in a useable format
app.use(cors())
app.use(bodyParser.json())

// This is how you could create a get request. 
app.get('/',async function (req, res) {
const results = await people.find()
  res.status(200).send(results)
})

// This is how you could create a post request. 
app.post('/',async function (req, res) {
  const results = await people.insert(req.body)
  res.status(200).send(results)
})

// Lets you know that the server is up and running
app.listen(port, () => console.log(`App listening on port ${port}!`))
