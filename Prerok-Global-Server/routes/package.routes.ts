const packageController = require("../controllers/package.controllers");

const router = require("express").Router();

router.post("/calculateCost", packageController.calculateCost);

module.exports = router;
