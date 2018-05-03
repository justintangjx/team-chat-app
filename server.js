const express = require("express");
const server = require("http").createServer();
const io = require("socket.io")(server);

let connections = [];
let users = [];

io.on("connection", function(socket) {
    connections.push(socket);
    console.log(`Total Connections:${connections.length}`);
  });

  server.listen(3001, function(err) {
    if (err) throw err;
    console.log("listening on port 3001");
  });
