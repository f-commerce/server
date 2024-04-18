const express = require('express')
const router = express.Router()
const { createUserCtrl, loginUserCtrl } = require('../controllers/userController')
const { getUsersCtrl } = require('../controllers/userController')
const { getUserByIdCtrl } = require('../controllers/userController')
const { deleteUserCtrl } = require('../controllers/userController')
const { updateUserCtrl } = require('../controllers/userController')

router.post('/register', createUserCtrl)
router.post('/login', loginUserCtrl)
router.get('/users', getUsersCtrl)
router.get('/:id', getUserByIdCtrl)
router.delete('/:id', deleteUserCtrl)
router.put('/:id', updateUserCtrl)

module.exports = router