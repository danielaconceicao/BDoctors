const express = require('express');
const router = express.Router();

const doctorsController = require('../controllers/doctorsController');
const reviewController = require('../controllers/reviewController');
const specializationsController = require('../controllers/specializationsController');
const getDoctorBySpecializations = require('../controllers/doctorsBySpecializations');

// Doctors routes
router.get('/doctors', doctorsController.index); // List all doctors
router.post('/doctors', doctorsController.store); // Add new doctor with optional specializations
router.delete('/doctors/:id', doctorsController.destroy); // Delete a doctor
router.get('/doctors/specializations/:specialization', getDoctorBySpecializations.getDoctorBySpecializations)
router.get('/doctors/:id/average-rating', doctorsController.getAverageRating); // Get average rating of a specific doctor

// Review routes
router.get('/reviews', reviewController.getReviews); // List all reviews
router.get('/reviews/:id', reviewController.getReviewById); // Get reviews of a specific doctor
router.post('/reviews', reviewController.postReview); // Add a new review
router.delete('/reviews/:id', reviewController.deleteReviewById); // Delete a specific review by ID

// Specializations routes
router.get('/specializations', specializationsController.index); // List all specializations
// router.post('/specializations', specializationsController.store); // Add a new specialization
// router.delete('/specializations/:id', specializationsController.destroy); // Delete a specialization


module.exports = router;
