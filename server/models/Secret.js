const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecretSchema = new Schema({
   hash: String,
   secretText: String,
   createdAt: Number,
   expiresAt: Number,
   remainingViews: Number,
   expireAfterViews: Number,
   expireAfter: Number
});

const Secret = mongoose.model('secret', SecretSchema);

module.exports = Secret;