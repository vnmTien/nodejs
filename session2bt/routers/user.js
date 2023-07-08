const router = require('express').Router();
const { getUser, createUser, deleteUser } = require('../controllers/user');

router.get('/', getUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);

module.exports = router;
