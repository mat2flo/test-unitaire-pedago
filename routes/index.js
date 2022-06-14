const express = require('express');

const { 
    debit,
    credit,
    accounts
} = require('../controllers/users.js');

module.exports = app => {
    app.get('/users/:id/accounts/', accounts)
    app.put('/users/:id/accounts/credit', credit)
    app.put('/users/:id/accounts/debit', debit)
}