const socketIO = require("socket.io")
const io = socketIO()
const socketApi = {}

socketApi.io = io
const sockets = {}
io.on("connection", (socket) => {
  console.log("A user connected")
  socket.on("nickNameUpdate", (data) => {
    socket.nickname = data.id // eslint-disable-line
    sockets[data.id] = socket.id
  })
  // disconnect
  socket.on("disconnect", () => {
    delete sockets.nickname
  })
})

socketApi.newRequest = (id, eventName, data) => {
  io.to(sockets[id]).emit(`${eventName}`, data)
}

module.exports = socketApi
