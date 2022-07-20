const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt')

const { getAll, getDocumentsColletion } = require('../controllers/searchs');

const router = Router();

router.get('/:search', validateJWT, getAll);
router.get('/collection/:collection/:search', validateJWT, getDocumentsColletion);

module.exports = router;