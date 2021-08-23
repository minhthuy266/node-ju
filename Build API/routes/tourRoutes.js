const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');

const tourRouter = express.Router();

tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);
tourRouter.route('/tour-stats').get(getTourStats);
tourRouter.route('/monthly-plan/:year').get(getMonthlyPlan);

// tourRouter.param('id', checkID);

// Create a checkBody middleware
// Check if body contains the name and the price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

tourRouter.route('/').get(protect, getAllTours).post(createTour);
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin'), deleteTour);

module.exports = tourRouter;
