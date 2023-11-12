const db = require('../database')
const model = require('../models')
const jwt = require('jsonwebtoken')

const authController = {}

authController.login = async (req, res, next) => {
    const {username, password} = req.body

    try {
        if(!username || !password) throw new Error('Username and Password is Required')

        const findUser = await model.userModel.user.findOne({
            where:{
                username: username,
                password: password
            }
        })

        if(!findUser.dataValues) throw new Error('User Not Found')

        const token = jwt.sign({ username: findUser.dataValues.username, password: findUser.dataValues.password, level: findUser.dataValues.level }, process.env.SALT, { expiresIn: '8h' });

        return res.status(200).json({
            msg: 'Success',
            data: token
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = authController