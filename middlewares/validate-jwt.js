const jwt = require('jsonwebtoken');
const User = require('../models/user');



const validateJWT = (req, res, next) => {

    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no sent'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token not valid'
        });
    }

}

const varlidateADMIN_ROLE = async (req, res, next) => {

    const uid = req.uid;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }
        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No privileges of admin'
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }

}

const validateADMIN_ROLE_or_SameUser = async (req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        if (userDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No privileges of admin'
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}


module.exports = {
    validateJWT,
    varlidateADMIN_ROLE,
    validateADMIN_ROLE_or_SameUser
}