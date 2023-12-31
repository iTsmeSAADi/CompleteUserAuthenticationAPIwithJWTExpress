import express from 'express'
import UserController from '../controllers/user_controller.js'

const router = express.Router()

router.post('/register', UserController.create_user)
router.post('/login', UserController.login_user)


export default router