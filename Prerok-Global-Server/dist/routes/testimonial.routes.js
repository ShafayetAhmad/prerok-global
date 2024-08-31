"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testimonial_controllers_1 = require("../controllers/testimonial.controllers");
const router = require('express').Router();
// route for get all addresses by userID
router.post("/add-testimonial", testimonial_controllers_1.addTestimonial);
// route for get address by address ID
router.get("/get-all-testimonials", testimonial_controllers_1.getAllTestimonials);
module.exports = router;
