import express from 'express'
import userController from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', userController.getUser)
router.post('/', userController.addUser)
router.patch('/', userController.updateUser)
router.delete('/', userController.deleteUser)


export default router