const { creditService, debitService } = require("../services/account.js");
const { isAmountWantedInBankAccountAuthorized } = require("../controllers/bank.js");
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
  const user = await User.findById(req.params.id);
  return res.send({
    user: {
      name: user.name,
      amount: user.amount,
    },
  });
};

const isPayloadCorrect = (payload) => {
  return typeof payload?.amount === 'number';
};

const debit = async (req, res, next) => {
  let user;
  try {
    if (!isPayloadCorrect(req.body)) throw new Error('Must be a number');
    user = await User.findById(req.params.id);
    user = await debitService(user, req.body.amount);
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
    if (!isPayloadCorrect(req.body)) throw new Error('Must be a number');
    user = await User.findById(req.params.id);
    user = await creditService(user, req.body.amount);
  } catch (error) {
    return next(error);
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
  if (!isAmountWantedInBankAccountAuthorized(payload.amount))
    return res.status(500).send("Amount not authorized");
  try {
    const user = await User.create(payload);
    return res.send(user);
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
