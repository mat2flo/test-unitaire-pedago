const express = require("express");
var router = express.Router();

const { debit, credit, accounts, createUser, getAllUsers, userExists } = require("../controllers/users.js");

router.get("/", getAllUsers);
router.post("/create", createUser);

router.use("/:id", userExists);
router.get("/:id/accounts/", accounts);
router.put("/:id/accounts/credit", credit);
router.put("/:id/accounts/debit", debit);

module.exports = router;
