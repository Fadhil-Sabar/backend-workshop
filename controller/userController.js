const db = require('../database')
const model = require('../models')

const userController = {}

userController.getAllUser = async (req, res, next) => {
    try {
        const [getData] = await db.query(`
            select * from user
        `)

        return res.status(200).json({
            msg: 'Success',
            data: getData
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

userController.createUser = async (req, res, next) => {
    const {nama, username, password, level} = req.body

    let t = await db.transaction({
        autocommit: false,
    });

    try {
        await model.userModel.user.create({
            nama: nama,
            username: username,
            password: password,
            level: level
        }, {
            transaction: t
        })

        await t.commit()

        return res.status(200).json({
            msg: 'Success',
            data: []
        })
    } catch (error) {
        if(t) await t.rollback()
        console.log(error)
        next(error)
    }
}

userController.updateUser = async (req, res, next) => {
    const {id_user, nama, username, password, level} = req.body

    let t = await db.transaction({
        autocommit: false,
    });

    try {
        if(!id_user) throw new Error('Id User is Required')

        const findUser = await model.userModel.user.findOne({
            where:{
                id_user: id_user
            }
        })

        if(!findUser.dataValues) throw new Error('User Not Found')

        await model.userModel.user.update({
            nama: nama,
            username: username,
            password: password,
            level: level
        }, {
            where: {
                id_user: id_user
            },
            transaction: t
        })

        await t.commit()

        return res.status(200).json({
            msg: 'Success',
            data: []
        })
    } catch (error) {
        if(t) await t.rollback()
        console.log(error)
        next(error)
    }
}

userController.deleteUser = async (req, res, next) => {
    const {id_user} = req.query

    let t = await db.transaction({
        autocommit: false,
    });

    try {
        if(!id_user) throw new Error('Id User is Required')

        const findUser = await model.userModel.user.findOne({
            where:{
                id_user: id_user
            }
        })

        if(!findUser.dataValues) throw new Error('User Not Found')

        await model.userModel.user.destroy({
            where: {
                id_user: id_user
            },
            transaction: t
        })

        await t.commit()

        return res.status(200).json({
            msg: 'Success',
            data: []
        })
    } catch (error) {
        if(t) await t.rollback()
        console.log(error)
        next(error)
    }
}

module.exports = userController