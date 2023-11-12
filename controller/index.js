const userController = require('./userController')
const authController = require('./authController')

const controller = {}

controller.userController = userController
controller.authController = authController

module.exports = controller