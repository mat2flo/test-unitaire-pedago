const express = require("express");
var router = express.Router();
const User = require("../models/User");

const { debit, credit, accounts } = require("../controllers/users.js");

const userExists = async (req, res, next) => {
  try {
    const userExists = await User.findById(1);
    if (!userExists) res.status(500).send("User does not exist");
    else next();
  } catch (error) {
    next(error);
  }
};

router.use("/:id", userExists);
router.get("/:id/accounts/", accounts);
router.put("/:id/accounts/credit", credit);
router.put("/:id/accounts/debit", debit);

module.exports = router;
