"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { genarateToken, removeToken } = require("../controllers/auth.controllers");
const router = require("express").Router();
// endpoit for genarate a token and set on client side cookie
router.post('/jwt', genarateToken);
// endpoit for clear token cookie
router.delete('/clear-cookie', removeToken);
module.exports = router;
