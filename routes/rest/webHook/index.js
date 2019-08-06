const cuid = require("cuid")
const WebHook = require("../../../models/webHook")
const socketApi = require("../../../socketApi")
module.exports = {
  async create(req, res) {
    try {
      return res.json({
        error: false,
        path: `${req.protocol}://${req.headers.host}/sethooklog/${cuid.slug()}`
      })
    } catch (err) {
      return res.status(500).json({ error: true, reason: err.message })
    }
  },
  async post(req, res) {
    try {
      // console.log(socketApi)
      const { hookId } = req.params
      delete req.params.hookId
      await WebHook.create({
        basicDetails: {
          url: req.originalUrl,
          protocol: req.protocol,
          method: req.method
        },
        body: req.body,
        hookid: hookId,
        params: req.params,
        query: req.query,
        header: req.headers
      })
      socketApi.newRequest(hookId, "newRequest", { from: hookId })
      return res.json({ error: false })
    } catch (err) {
      return res.status(500).json({ error: true, reason: err.message })
    }
  },

  async find(req, res) {
    try {
      const reqLogs = await WebHook.find({ hookid: req.params.hookId })
        .select("-hookid")
        .exec()
      return res.json({ error: false, reqLogs })
    } catch (err) {
      return res.status(500).json({ error: true, reason: err.message })
    }
  },

  async delete(req, res) {
    try {
      await WebHook.deleteOne({ _id: req.params.id })
      return res.json({ error: false })
    } catch (err) {
      return res.status(500).json({ error: true, reason: err.message })
    }
  }
}
