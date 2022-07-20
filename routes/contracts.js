const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getContracts,
    createContract,
    updateContract,
    deleteContract,
    getContractById
} = require('../controllers/contracts')


const router = Router();

router.get('/', validateJWT, getContracts);

router.post('/',
    [
        validateJWT,
        check('employee', 'Employee required').not().isEmpty(),
        check('type_contract', 'Type contract required').not().isEmpty(),
        validateFields
    ],
    createContract
);

router.put('/:id',
    [
        validateJWT,
        check('employee', 'Employee required').not().isEmpty(),
        check('type_contract', 'Type contract required').not().isEmpty(),
        validateFields
    ],
    updateContract
);

router.delete('/:id',
    validateJWT,
    deleteContract
);

router.get('/:id',
    validateJWT,
    getContractById
);

module.exports = router;



