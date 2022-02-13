const express = require("express");
const router = express.Router();
const { Comment } = require("../server/src/models");

router.post("/", async (req, res) => {
  try {
    await Comment.create(req.body.comment);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
