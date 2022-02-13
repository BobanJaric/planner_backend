const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const HttpError = require('../models/http-errors');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError('fetching users failed', 500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });

};

const getUsersName = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, 'name email role');
  } catch (err) {
    const error = new HttpError('fetching users failed', 500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });

};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs please check your data', 422)
    );
  }

  let { name, email, password,role } = req.body;

  name = name.toLowerCase();
  email = email.toLowerCase();
  password = password.toLowerCase();
  role = role.toLowerCase();

  let existingUser;
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    const error = new HttpError('Email already exists', 500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError('User exist already, please log in', 422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('ECould not create user, please try again', 500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    role
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signin up failed!!!', 500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign({
      userId: createdUser.id, email: createdUser.email
    },
      'supersecret_dont_share',
      { expiresIn: '12h' }
    );
  } catch (err) {
    const error = new HttpError('Signin up failed!!!', 500
    );
    return next(error);
  }

  res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
};


const login = async (req, res, next) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  password = password.toLowerCase();

  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email })
  } catch (err) {
    const error = new HttpError('LogIn failed', 500
    );
    return next(error);
  }

  if (!identifiedUser) {
    const error = new HttpError('Invalid credentials', 403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);

  } catch (err) {
    const error = new HttpError('Could not log in please check your credentials', 401
    );
    return next(error);
  }
  if (!isValidPassword) {
    const error = new HttpError('Could not log in please check your credentials', 401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign({
      userId: identifiedUser.id, email: identifiedUser.email
    },
      'supersecret_dont_share',
      { expiresIn: '12h' }
    );
  } catch (err) {
    const error = new HttpError('Signin up failed!!!', 500
    );
    return next(error);
  }

  res.json({
    userId: identifiedUser.id,
    email: identifiedUser.email,
    token: token,
    role: identifiedUser.role
  });
};

exports.getUsers = getUsers;
exports.getUsersName = getUsersName;
exports.signup = signup;
exports.login = login;
