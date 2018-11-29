const express = require('express');
const UserRouter = express.Router();
const user_controller = require('../controllers/user.controller')

UserRouter.get('/test',user_controller.test);

UserRouter.post('/createUser', user_controller.user_create);

UserRouter.get('/:id', user_controller.user_details);

UserRouter.put('/:id/update', user_controller.user_update);

UserRouter.delete('/:id/delete', user_controller.user_delete);

UserRouter.post('/processIntents', user_controller.processWords);


module.exports = UserRouter;