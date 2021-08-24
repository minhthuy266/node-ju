const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllTours,
  getTour,
  createTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  updateTour,
  getToursWithin,
  getDistances,
} = require('../controllers/tourController');
// const { createReview } = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');

const tourRouter = express.Router();

tourRouter.use('/:tourId/reviews', reviewRouter);

tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);
tourRouter.route('/tour-stats').get(getTourStats);
tourRouter
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

// tourRouter.param('id', checkID);

// Create a checkBody middleware
// Check if body contains the name and the price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

tourRouter.route(
  '/tour-within/:distance/center/:latlng/unit/:unit',
  getToursWithin
);

// /tours-distance?distance=233&center=-40,45&unit=mi
// /tours-distance/233/center/-40,45/unit/mi

tourRouter.route('/distances/:latlng/unit/:unit').get(getDistances);

tourRouter
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin'), deleteTour);

// tourRouter
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createReview);

module.exports = tourRouter;
