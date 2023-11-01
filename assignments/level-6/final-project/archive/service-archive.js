// Socket IO
const io = new Server(httpServer, { 
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false
  }
});

// Socket IO
/*
io.on('connection', (socket) => {
  console.log('A user just connected.');

  socket.on("hello", (arg) => {
    console.log(arg); // world
    socket.emit("greeting", 'howdy from server')
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
  })
});*/