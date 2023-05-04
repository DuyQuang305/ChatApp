const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./config/db');
const router = require('./routes');
const socket = require('socket.io');

const PORT = 8000

// Connect to DB
db.connect();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))

// router(app)
app.get('/', function (req, res) {
    res.send('hello')
  })

router(app)

const server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:8000`);
})

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.io);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.message);
    }
  })
})
