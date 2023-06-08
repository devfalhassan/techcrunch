const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  if (!newUser) {
    next(new AppError(404, 'failed to create new user'));
  }

  res.status(201).json({
    status: 'success',
    data: { newUser }
  });
});
