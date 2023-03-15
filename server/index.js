import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// io.on('connection', (socket) => {

//   console.log(`User connected: ${socket.id}`);

//   socket.on('disconnect', () => {
//     console.log('User disconnected', socket.id)
//   })
// });
 
io.on("connection", (socket) => {
  socket.on('send-message', (message) => {
    io.emit('receive-message', message)
    console.log(message)
  })
});


app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

//when deploying remove api/v1 from users
app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);

//server for mongodb
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () => console.log('Server started on port http://localhost:8080'))
  } catch(error) {
    console.log(error)
  }
}

// server for socket.io
server.listen(3001, () => {
  console.log("SERVER RUNNING ON http://localhost:3001")
});

startServer();