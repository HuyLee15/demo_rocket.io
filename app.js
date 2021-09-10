const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();

app.set("view engine", "ejs");

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
    const number = Math.floor(Math.random() * 2);

    console.log(socket.id, number);
    socket.join(number);
    socket.on("send_message", data => {
        console.log(data);
        socket.broadcast.to(number).emit("server_send_msg", data);
    });

    socket.on("disconnect", (data) => {
        console.log(data);
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(5000, () => console.log("sever running on port 5000!"));