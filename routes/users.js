/*
    Ruta: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { 
    validateJWT, 
    varlidateADMIN_ROLE,
    validateADMIN_ROLE_or_SameUser
 } = require('../middlewares/validate-jwt');


const router = Router();


router.get( '/', validateJWT , getUsers );

router.post( '/',
    [
        check('first_name', 'First Name is Required').not().isEmpty(),
        check('first_name', 'Last Name is Required').not().isEmpty(),
        check('password', 'Password is Required').not().isEmpty(),
        check('email', 'Email is Required').isEmail(),
        validateFields,
    ], 
    createUser 
);

router.put( '/:id',
    [
        validateJWT,
        validateADMIN_ROLE_or_SameUser,
        check('first_name', 'First Name is Required').not().isEmpty(),
        check('first_name', 'Last Name is Required').not().isEmpty(),
        check('email', 'Email is Required').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validateFields,
    ],
    updateUser
);

router.delete( '/:id',
    [ validateJWT, varlidateADMIN_ROLE ],
    deleteUser
);



module.exports = router;