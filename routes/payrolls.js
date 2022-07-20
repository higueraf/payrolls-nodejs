const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getPayrolls,
    createPayroll,
    updatePayroll,
    deletePayroll
} = require('../controllers/payrolls');


const router = Router();

router.get('/', getPayrolls);

router.post('/',
    [
        validateJWT,
        check('name', 'payroll description required').not().isEmpty(),
        check('fromDate', 'from Date required').not().isEmpty(),
        check('toDate', 'to Date required').not().isEmpty(),
        validateFields
    ],
    createPayroll
);

router.put('/:id',
    [
        validateJWT,
        check('name', 'payroll description required').not().isEmpty(),
        check('fromDate', 'from Date required').not().isEmpty(),
        check('toDate', 'to Date required').not().isEmpty(),
        validateFields
    ],
    updatePayroll
);

router.delete('/:id',
    validateJWT,
    deletePayroll
);

module.exports = router;
