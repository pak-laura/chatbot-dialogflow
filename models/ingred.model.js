
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredSchema = new Schema({
   name: { type: String},
   description: {type: String},
   goodSkin: { type: String},
   badSkin: { type: String},
   // },{
   //    collection: 'users'
});

module.exports = mongoose.model('Ingred', IngredSchema);