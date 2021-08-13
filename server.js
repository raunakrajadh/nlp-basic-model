const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const { NlpManager } = require('node-nlp')
const manager = new NlpManager({ languages: ['en'], forceNER: true });
const { nlpModule } = require('./nlp')
nlpModule(manager)
let users = {}

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

io.on('connection', socket => {

    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
  
    socket.on('send-chat-message', async message => {

        let response = await manager.process('en', message);

        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
        socket.emit('chat-message', { message: response.answer, name: 'Bot' })
        socket.broadcast.emit('chat-message', { message: response.answer, name: 'Bot' })
    })
  
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
  })


let port = process.env.port || 5000
server.listen(port, () => {
    console.log('Listening at port: ' + port)
})