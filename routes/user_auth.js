const express = require('express');
const { registerUser, authUser, logoutUser } = require('../controller/user_controller');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post("/logout", logoutUser)

module.exports = router;