const userRouter = require('./userRouter')
const authRouter = require('./authRouter')

const routes = {}

routes.userRouter = userRouter
routes.authRouter = authRouter

module.exports = routes