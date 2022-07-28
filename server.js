// initiate express and assign variable in order to use express syntax in this document
const express = require('express')
// assign variable for easier use
const app = express()
// initiate mongoDB and assign variable in order to use later
const MongoClient = require('mongodb').MongoClient
// assign a port variable a value (where you are going to local host)
const PORT = 2121
// initiate dotenv package to access environment variables (in .env)
require('dotenv').config()

// create variable for db without value
let db,
// assign local variable to environment variable
    dbConnectionStr = process.env.DB_STRING,
    // assign name of your database collection
    dbName = 'todo'

// connect the server.js to the mongoDB
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
// then tell us (via the console) that we successfully connected
    .then(client => {
        // console log that we successfully connected
        console.log(`Connected to ${dbName} Database`)
        // assign db value to currently connected mongoDB
        db = client.db(dbName)
    })
    
// let the browser know that our view engine is ejs so it can transform it into an HTML file
app.set('view engine', 'ejs')
// set public folder as static file location (middleware)
app.use(express.static('public'))
// middleware to parse incoming requests (including form data)
app.use(express.urlencoded({ extended: true }))
// middleware to parse the body from post/fetch requests to JSON
app.use(express.json())

// when the home page is requested, do this:
app.get('/',async (request, response)=>{
    // search the 'todos' collection in the 'todo' db and convert the data to an array
    const todoItems = await db.collection('todos').find().toArray()
    // search the 'todos' collection in the 'todo' db and count the number of separate items with a completed: false property: value pair
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    // render the index.ejs file with the data retrieved from the db (in the form of an object)
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
})

// when the client requests the /addToDo POST (from the index.ejs form) do this:
app.post('/addTodo', (request, response) => {
    // add an object with the form data to the mongodb 'todo' collection with default completed value of false
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
    // then do this:
    .then(result => {
        // let us know that the todo was added via a console.log
        console.log('Todo Added')
        // refresh page
        response.redirect('/')
    })
    // otherwise, catch and tell us about any errors via the console
    .catch(error => console.error(error))
})

// when the client requests the /markComplete update do this:
app.put('/markComplete', (request, response) => {
    // grab the item from the 'todos' collection that has a thing value of whatever is clicked and do this:
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        // set the completed property to have a true value
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    // then tell us that the operation was succesful
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    // otherwise, tell us what went wrong
    .catch(error => console.error(error))

})

// when the client requests the /markUnComplete update do this:
app.put('/markUnComplete', (request, response) => {
     // grab the item from the 'todos' collection that has a thing value of whatever is clicked and do this:
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        // set the completed property to have a false value
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    // then tell us that the operation was succesful
    .then(result => {
        console.log('Marked UnComplete')
        response.json('Marked UnComplete')
    })
    // otherwise, tell us what went wrong
    .catch(error => console.error(error))

})

// when the client requests the /deleteItem DELETE do this:
app.delete('/deleteItem', (request, response) => {
    // grab the item from the 'todos' collection that has a thing value of whatever is clicked and delete that item from the database:
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    // then tell us that the operation was succesful
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    // otherwise, tell us what went wrong
    .catch(error => console.error(error))

})

// listen for visitors at the port environment variable OR our locally defined PORT value
app.listen(process.env.PORT || PORT, ()=>{
    // then tell us which port we are on
    console.log(`Server running on port ${PORT}`)
})