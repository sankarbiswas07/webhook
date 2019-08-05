const createError = require("http-errors")
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const http = require("http")
const socketApi = require("./socketApi")
require("dotenv").config()
const config = require("./config")[process.env.NODE_ENV || "development"]

const restRoutes = require("./routes/rest")
const webRoutes = require("./routes/web")

const app = express()

if (
  process.env.NODE_ENV !== undefined
  && process.env.NODE_ENV !== "development"
) {
  app.use(helmet())
}
app.use(cors())

// Database setup
mongoose.Promise = global.Promise
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useCreateIndex: true
})

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", webRoutes)
// app.use(`/api/v${config.apiVersion}`, restRoutes)
app.use(restRoutes)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Socket.io
 */
const { io } = socketApi
io.attach(server)

/**
 * Create HTTP server.
 */
/*
const io = socket(server)
const sockets = {}
io.on("connection", (client) => {
  client.on("nickNameUpdate", (data) => {
    client.nickname = data.id // eslint-disable-line
    sockets[data.id] = client.id
    setTimeout(() => {
      io.to(sockets[data.id]).emit("test", { data: "recived2" })
      console.log(`${client.id} fired!!`)
    }, 5000)
  })
  // disconnect
  client.on("disconnect", () => {
    delete sockets[client.nickname]
  })
})


// Emit Events
io.eventList = {}
io.eventList.newRequest = (id, eventName, data) => {
  io.to(sockets[id]).emit(`${eventName}`, data)
}
*/

module.exports = { app, server }
