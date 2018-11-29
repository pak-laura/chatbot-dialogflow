
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   name: { type: String},
   skinType: { type: String},
   // },{
   //    collection: 'users'
});

module.exports = mongoose.model('User', UserSchema);