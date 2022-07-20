const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            });
        }
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password not valid'
            });
        }
        const token = await generateJWT(userDB.id);
        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(userDB.role)
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }


}


const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const userDB = await User.findOne({ email });
        let user;
        if (!userDB) {
            user = new User({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            user = userDB;
            user.google = true;
        }
        await user.save();
        const token = await generateJWT(user.id);
        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(user.role)
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token not valid',
        });
    }

}


const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
        ok: true,
        token,
        user,
        menu: getMenuFrontEnd(user.role)
    });

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}
