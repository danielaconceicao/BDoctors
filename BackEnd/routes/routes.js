const express = require('express');
const router = express.Router();

const doctorsController = require('../controllers/doctorsController')
const reviewController = require('../controllers/reviewController')

//Doctors routes
router.get("/doctors", doctorsController.index);  // List all doctors
router.post("/doctors", doctorsController.store); // Add new doctor
router.delete("/doctors/:id", doctorsController.destroy); // Delete a doctor


// Review routes
router.get("/reviews", reviewController.getReviews)
router.get("/reviews/:id", reviewController.getReviewById)
router.post("/reviews", reviewController.postReview)
router.delete("/reviews/:id", reviewController.deleteReviewById)




module.exports = router;
