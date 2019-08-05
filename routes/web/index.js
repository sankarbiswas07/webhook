const cuid = require("cuid")
const express = require("express")
const router = express.Router()

const User = require("../../models/user")

router.get("/", (req, res) => {
  try {
    return res.render("webhook/index1", {
      title: "Express",
      page: "Home",
      menuId: "home",
      path: `${req.protocol}://${req.headers.host}/sethooklog/${cuid.slug()}`
    })
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

/* GET home page. */
router.get("/resetpassword/:token", async (req, res) => {
  try {
    const { token } = req.params
    const now = new Date()
    const user = await User.findOne({
      isActive: true,
      "forgotpassword.token": token,
      "forgotpassword.expiresAt": { $gte: now }
    })
      .select("email")
      .lean()
      .exec()
    if (user === null) throw new Error("INVALID OR EXPIRED LINK")
    return res.render("resetpassword", { handle: user.email, token })
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

module.exports = router
