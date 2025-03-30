const { Router } = require('express');
const { userCreateGet, userCreatePost } = require('../controllers/userController');

const router = Router();

router.get('/create', userCreateGet);
router.post('/create', userCreatePost);


module.exports = router;