const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
});

module.exports = mongoose.model('User', userSchema);