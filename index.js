const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// app.get('/', (req, res) => {
//     res.send('<h1>App is runing via</h1>')
// })

app.use(cors())

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/History', require('./api/route'))

const PORT = process.env.PORT || 4444
app.listen(PORT, () => {
    console.log('App is running in node server')
    mongoose.connect(`mongodb+srv://YourUser:YourPass@cluster0.qwrrn.mongodb.net/dbName?retryWrites=true&w=majority`, () => {
        console.log('Database Connected')
    })
})