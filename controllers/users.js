const { creditService, debitService } = require("../services/account.js");
const { isAmountWantedInBankAccountAuthorized } = require("../controllers/bank.js");
const User = require("../models/User");

const userExists = async (req, res, next) => {
  try {
    const userExists = await User.findById(req.params.id);
    if (!userExists) throw new Error('User does not exist');
    else next();
  } catch (error) {
    next(error);
  }
};

const accounts = async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.send({
    user: {
      name: user.name,
      amount: user.amount,
    },
  });
};

const isPayloadCorrect = (amount) => {
  return typeof amount === 'number' && !isNaN(amount);
};

const castNumber = (number) => {
  return Number(number);
}

const debit = async (req, res, next) => {
  let user;
  let amount = castNumber(req.body.amount);
  try {
    if (!isPayloadCorrect(amount)) throw new Error('Must be a number');
    user = await User.findById(req.params.id);
    user = await debitService(user, amount);
  } catch (error) {
    return next(error);
  }
  return res.send({
    message: "ok",
    id: +user.id,
    debit: amount,
    newAmount: user.amount,
  });
};


const credit = async (req, res, next) => {
  let user;
  let amount = castNumber(req.body.amount);
  try {
    if (!isPayloadCorrect(amount)) throw new Error('Must be a number');
    user = await User.findById(req.params.id);
    user = await creditService(user, amount);
  } catch (error) {
    return next(error);
  }
  return res.send({
    message: "ok",
    id: +user.id,
    credit: amount,
    newAmount: user.amount,
  });
};

// create a new user
const createUser = async (req, res, next) => {
  const payload = req.body;
  if (!isAmountWantedInBankAccountAuthorized(payload.amount))
    return res.status(500).send("Amount not authorized");
  try {
    const user = await User.create(payload);
    return res.status(201).send(user);
  } catch (error) {
    return next(error);
  }
};

// get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  accounts,
  debit,
  credit,
  createUser,
  getAllUsers,
  userExists,
  isPayloadCorrect,
};
