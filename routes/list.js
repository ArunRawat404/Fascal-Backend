const express = require('express');
const { createList, getUserLists } = require('../controller/list_contoller');
const router = express.Router();

router.post('/', createList);
router.get('/:userId', getUserLists);

module.exports = router;
