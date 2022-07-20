const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async (req, res) => {
    const from = Number(req.query.from) || 0;
    const [users, total] = await Promise.all([
        User
            .find({}, 'first_name last_name email role google img')
            .skip(from)
            .limit(5),
        User.countDocuments()
    ]);
    res.json({
        ok: true,
        users,
        total
    });
}

const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const existeEmail = await User.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Existing email'
            });
        }
        const user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        const token = await generateJWT(user.id);
        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}


const updateUser = async (req, res = response) => {
    // TODO: Validar token y comprobar si es el user correcto
    const user_id = req.params.id;
    try {
        const userDB = await User.findById(user_id);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'The user does not exist'
            });
        }
        const { password, google, email, ...campos } = req.body;
        if (userDB.email !== email) {
            const existeEmail = await User.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Existing email'
                });
            }
        }
        if (!userDB.google) {
            campos.email = email;
        } else if (userDB.email !== email) {
            return res.status(400).json({
                ok: false,
                msg: 'Google user can\'t change their email'
            });
        }
        const userUpdated = await User.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            user: userUpdated
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}


const deleteUser = async (req, res = response) => {

    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un user por ese id'
            });
        }
        await User.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'User eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}