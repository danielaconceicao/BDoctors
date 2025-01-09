const express = require('express');
const router = express.Router();

const doctorsController = require('../controllers/doctorsController')

//Doctors routes
router.get("/doctors", doctorsController.index);  // List all doctors
router.post("/doctors", doctorsController.store); // Add new doctor
router.delete("/doctors/:ID", doctorsController.destroy); // Delete a doctor

module.exports = router;
