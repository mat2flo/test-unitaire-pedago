const User = require("../models/User");
const {
  isTimestampBetweenRangeHoursMailToSend,
  isDebitAuthorized,
  isCreditAuthorized,
} = require("../controllers/bank");
const { emailSender } = require("../services/emailSender.js");

const creditService = async (user, amount) => {
  if (!isCreditAuthorized(user.amount, amount))
    throw new Error("Credit not authorized");
  user.amount += amount;
  await user.save();
  if (isTimestampBetweenRangeHoursMailToSend(new Date())) {
    emailSender();
  }
  return user;
};

const debitService = async (user, amount) => {
  if (!isDebitAuthorized(user.amount, amount))
    throw new Error("Debit not authorized");
  user.amount -= amount;
  await user.save();
  if (isTimestampBetweenRangeHoursMailToSend(new Date())) {
    emailSender();
  }
  return user;
};

module.exports = { creditService, debitService };

