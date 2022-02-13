const express = require("express");
const router = express.Router();
const { Event, Comment } = require("../server/src/models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const { order } = req.query;
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  try {
    const events = await Event.findAll({
      where: { 
        date: {
          [Op.gt]: tenDaysAgo,
        }
      },
      attributes: ["id", "name", "date", "email", "description", "state"],
      order: [[order, "ASC"]],
    });

    res.status(200).json({ events });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { id: req.params.id },
      attributes: ["id", "name", "date", "email", "description", "state"],
      include: [
        {
          model: Comment,
          as: "comments",
          required: false,
          attributes: ["id", "author", "message"],
        }
      ]
    })

    if (!event) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ event });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    await Event.create(req.body.event);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
