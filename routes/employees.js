const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById
} = require('../controllers/employees')


const router = Router();

router.get('/', validateJWT, getEmployees);

router.post('/',
    [
        validateJWT,
        check('first_name', 'first name required').not().isEmpty(),
        check('last_name', 'last name required').not().isEmpty(),
        validateFields
    ],
    createEmployee
);

router.put('/:id',
    [
        validateJWT,
        check('first_name', 'first name required').not().isEmpty(),
        check('last_name', 'last name required').not().isEmpty(),
        validateFields
    ],
    updateEmployee
);

router.delete('/:id',
    validateJWT,
    deleteEmployee
);

router.get('/:id',
    validateJWT,
    getEmployeeById
);

module.exports = router;



