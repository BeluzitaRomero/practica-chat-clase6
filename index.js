const express = require("express");
const app = express();
const router = require("./routes/index");

let arrMsg = [
  {
    user: "Bel",
    msg: "Hola",
  },
  {
    user: "Nahu",
    msg: "Hola, bel",
  },
];

//Archivos Estaticos
app.use(express.static(__dirname + "/public"));

//Server para que socket funcione
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 8080;

//Configurar el socket
const { Server } = require("socket.io");
const io = new Server(server);

//Conexion socket
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("message_front", (data) => {
    console.log(data);
  });

  //Escuchar chat cliente
  socket.on("msg_client", (data) => {
    arrMsg.push(data);
    console.log(arrMsg);

    // socket.emit("message_back", arrMsg);
    io.sockets.emit("message_back", arrMsg);
  });
});

//Router
app.use("/api", router);

server.listen(port, () => {
  console.log("Server OK!");
});
