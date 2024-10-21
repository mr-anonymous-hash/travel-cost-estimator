const router = require('express').Router()
const auth_controller = require('./../controllers/auth_controller')

router.post('/login',auth_controller.login)
router.post('/signup',auth_controller.signup)
router.post('/adminlogin', auth_controller.adminlogin)

module.exports = router
