const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectToDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
    


app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandler)
 
const port = process.env.PORT || 3000


const start = async() =>{
    try{
        await connectToDB(process.env.MONGO_URI)
        console.log('conected to DB')
        app.listen(port, console.log(`server is listening on ${port}...`))
    } catch(error){
        console.log(error)
    }
}

start()