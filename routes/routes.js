const express = require('express');
const router = express.Router();

const doctorsController = require('../controllers/doctorsController')

//Doctors routes
router.get("/doctors", doctorsController.index);  // List all users
router.post("/doctors", doctorsController.store); // Add new user
router.delete("/users/:ID", doctorsController.destroy); // Delete user

module.exports = router;
