"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packageController = require('../controllers/package.controllers');
const router = require('express').Router();
router.post('/calculateCost', packageController.calculateCost);
module.exports = router;
