const User = require('../models/user.model');
var mongoose = require('mongoose')
const Ingred = require('../models/IngredSchema')

exports.test = function(req, res) {
   res.send('testing changes from controller');
};

exports.user_create = function(req, res) {
   let user = new User({
      name: req.body.name,
      skinType: req.body.skinType
   });
   user.save(function(err) {
      if (err) {
         return next(err);
      }
      res.send('User created successfully')
   })
};

exports.user_details = function(req, res) {
   User.findById(req.params.id, function(err, user) {
      if (err) return next(err);
      res.send(user);
   })
}

exports.user_update = function(req, res) {
   User.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, product) {
      if (err) return next(err);
      res.send('User updated.');
   });
};

exports.user_delete = function(req, res) {
   User.findByIdAndRemove(req.params.id, function (err) {
      if (err) return next(err);
      res.send('Deleted successfully');
   })
};

function skin_type_rec(req, res) {
   var name = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.given-name ? req.body.queryResult.parameters.given-name : 'friend';
   //const sType = req.body.skinType ? req.body.skinType : 'error';
   const sType = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.skinType ? req.body.queryResult.parameters.skinType : 'error';
   // const problems = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.skinProblems ? req.body.queryResult.parameters.skinProblems : 'aging';
   let sendingData = '';
   if (sType == 'dry') {
      sendingData = 'Well, ' + name+', for dry skin, I recommend glycerin, PCA, and ceramides. Try to stay away from alcohol.';
   } else if (sType == 'oily') {
      sendingData = 'Well, ' +  name+', for oily skin, I recommend dimethicone, glycolic acid, niacinamide, retinol, and salicylic acid. Try to stay away from petroleum and natural oils.';
   } else if (sType == 'combination') {
      sendingData = 'Well, ' +  name+', for combination skin, I recommend witch hazel, lactic acid, green tea, and jojoba oil. Try to stay away from petroleum, natural oils, and alcohol.';
   } else if (sType == 'normal') {
      sendingData = 'Well, ' + name+ ', for normal skin, I recommend aloe and caffeine (topical). Try to stay away from coconut oil.';
   } else {
      sendingData = 'Sorry, ' + name+', I\'m afraid I don\'t recognize your skin type. Could you tell me if it\'s dry, oily, normal, or combination?';
   }

// dry, oily, combination, normal
// acne, acne scarring, aging, dark spots, redness
// brighten, rough, age spots
// goodSkin field has 1 max, empty string if bad
// badSkin field can be 'all' or some specific type or empty string

// get app on heroku
// put heroku address in dialogflow fulfillment tab
// test out the parameters returning
// add a function for grabbing data from database in response to asking about ingredients
// which should be easy except for the actual data grab
// don't forget the nice web page on handling 2 intents--it's in the actions

   return res.json({
      fulfillmentText: sendingData,
      source: 'please-be-more-chill'
   });

};


//get ingredient description
function ingredient_info(req,res) {
   let ingredientToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.Ingredients ? req.body.queryResult.parameters.Ingredients : 'Unknown';
   console.log(ingredientToSearch);
   Ingred.findOne({name:ingredientToSearch},function(err,ingredientExists) {
      if (err) {
         return res.json({
            fulfillmentText: 'Something went wrong!',
            source: 'ingredient info'
         });
      }
      if (ingredientExists) {
         return res.json({
            fulfillmentText: ingredientExists.description,
            source: 'ingredient info'
         });
      }
      else {
         return res.json({
            fulfillmentText: 'Currently I do not have information about this ingredient',
            source: 'ingredient info'
         });
      }
   });
}

exports.processWords = function(req, res) {
   const action = req.body.queryResult && req.body.queryResult.action ? req.body.queryResult.action : 'error';
   if (action == 'getRec') {
      return skin_type_rec(req, res);
   } else if (action == 'ingredientDesc') {
      return ingredient_info(req, res);
   } else {
      return res.json({
         fulfillmentText: 'Sorry, I don\'t understand. Can you repeat that?',
         source: 'please-be-more-chill'
      });
   }
};