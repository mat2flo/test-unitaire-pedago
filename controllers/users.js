const {
  isTimestampBetweenRangeHoursMailToSend,
  isDebitAuthorized,
  isCreditAuthorized,
} = require("./bank.js");
const { creditService, debitService } = require("../services/account.js");
const User = require("../models/User");

const userExists = async (req, res, next) => {
  try {
    const userExists = await User.findById(req.params.id);
    if (!userExists) res.status(500).send("User does not exist");
    else next();
  } catch (error) {
    next(error);
  }
};

const accounts = async (req, res) => {
  return res.send("ok");
};

const debit = async (req, res, next) => {
  let user;
  try {
    user = await debitService(req.params.id, req.body.amount);
  } catch (error) {
    return next(error);
  }
  return res.send({
    message: "ok",
    id: user.id,
    debit: req.body.amount,
    newAmount: user.amount,
  });
};

const credit = async (req, res, next) => {
  let user;
  try {
    user = await creditService(req.params.id, req.body.amount);
  } catch (error) {
    return next(error);
  }
  if (isTimestampBetweenRangeHoursMailToSend(new Date())) {
    emailSender();
  }
  return res.send({
    message: "ok",
    id: user.id,
    credit: req.body.amount,
    newAmount: user.amount,
  });
};

// create a new user
const createUser = async (req, res) => {
  const payload = req.body;
  try {
    const user = await User.create(payload);
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  accounts,
  debit,
  credit,
  createUser,
  getAllUsers,
  userExists,
};
