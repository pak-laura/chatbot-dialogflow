const User = require('../models/user.model');

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

//function skin_type_rect(req, res) {
exports.skin_type_rec = function(req, res) {
   const name = req.body.result && req.body.result.parameters && req.body.result.parameters.name ? req.body.result.parameters.name : 'friend';
   //const sType = req.body.skinType ? req.body.skinType : 'error';
   const sType = req.body.result && req.body.result.parameters && req.body.result.parameters.skinType ? req.body.result.parameters.skinType : 'error';
   const problems = req.body.result && req.body.result.parameters && req.body.result.parameters.problems ? req.body.result.parameters.problems : 'aging';
   var sendingData = '';
   if (sType == 'dry') {
      sendingData = 'For dry skin, I recommend glycerin, PCA, and ceramides. Try to stay away from alcohol.';
   } else if (sType == 'oily') {
      sendingData = 'For oily skin, I recommend dimethicone, glycolic acid, niacinamide, retinol, and salicylic acid. Try to stay away from petroleum and natural oils.';
   } else if (sType == 'combination') {
      sendingData = 'For combination skin, I recommend witch hazel, lactic acid, green tea, and jojoba oil. Try to stay away from petroleum, natural oils, and alcohol.';
   } else if (sType == 'normal') {
      sendingData = 'For normal skin, I recommend aloe and caffeine (topical). Try to stay away from coconut oil.';
   } else {
      sendingData = 'I\'m afraid I don\'t recognize your skin type. Could you tell me what it is please?';
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
      fulfillmentTest: sendingData,
      speech: sendingData,
      displayText: sendingData,
      source: 'please-be-more-chill'
   });

};

function skin_type_red(req, res) {
   return res.json({
      words: 'testing skin_type_red'
   });
}

exports.processWords = function(req, res) {
   // if (req.body.result.action == 'getRec') {
   //    skin_type_red(req, res);
   // }
   skin_type_red(req, res);
}