const express = require("express")
const router = express.Router()

// const expressJwt = require("express-jwt")

const webHook = require("./webHook")

/* const config = require("../../config")[process.env.NODE_ENV || "development"]

 const checkJwt = expressJwt({ secret: config.secret }) // the JWT auth check middleware

const login = require("./auth")
const signup = require("./auth/signup")
const forgotpassword = require("./auth/password")
const users = require("./users")

*/

// WebHook service
router.get("/webhook", webHook.create) // UNAUTHENTICATED
router.all("/sethooklog/:hookId", webHook.post) // UNAUTHENTICATED
router.get("/gethooklogs/:hookId", webHook.find) // UNAUTHENTICATED
router.delete("/gethooklogs/:id", webHook.delete) // UNAUTHENTICATED
/*
router.post("/login", login.post) // UNAUTHENTICATED
router.post("/signup", signup.post) // UNAUTHENTICATED
router.post("/forgotpassword", forgotpassword.startWorkflow) // UNAUTHENTICATED; AJAX
router.post("/resetpassword", forgotpassword.resetPassword) // UNAUTHENTICATED; AJAX

router.all("*", checkJwt) // use this auth middleware for ALL subsequent routes

router.get("/users", users.find)
router.get("/user/:id", users.get)
router.post("/user", users.post)
router.put("/user/:id", users.put)
router.delete("/user/:id", users.delete)

*/

module.exports = router
