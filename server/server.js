require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ctrl = require('./controller')
const massive = require('massive')

const app = express()

app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING)
.then((db)=>{
    app.set('db',db)
    app.listen(PORT, ()=> console.log(`my server is listening on port ${PORT}`))
})
app.get('/api/todolist', ctrl.read)
app.post('/api/todolist', ctrl.create)
app.put('/api/todolist/:id', ctrl.edit)


const PORT=3121
