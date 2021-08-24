const Review = require('../models/reviewModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const {
  deleteModel,
  updateModel,
  createModel,
  getModel,
  getAll,
} = require('./handlerFactory');

exports.getAllReviews = getAll(Review);

exports.setTourUserIds = (req, res, next) => {
  //   Allow nested routes
  if (!req.query.tour) req.body.tour = req.params.tourId;
  if (!req.query.user) req.body.user = req.params.userId;
  next();
};

exports.getReview = getModel(Review);
exports.createReview = createModel(Review);
exports.updateReview = updateModel(Review);
exports.deleteReview = deleteModel(Review);
