const {
  isTimestampBetweenRangeHoursMailToSend,
  isDebitAuthorized,
  isCreditAuthorized,
} = require("./bank.js");

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

const debit = (req, res) => {
  const payload = req.body;
  const idUser = req.params.id;
  if (checkIfDebitAuthorized) {
    //TODO:debit in db
    if (isTimestampBetweenRangeHoursMailToSend) {
      emailSender();
    }
    return res.send("ok");
  }
};

const credit = (req, res) => {
  const payload = req.body;
  const idUser = req.params.id;
  //TODO:credit in db
  if (isTimestampBetweenRangeHoursMailToSend) {
    emailSender();
  }
  return res.send("ok");
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
