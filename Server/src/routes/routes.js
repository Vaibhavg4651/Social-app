import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  logout,
  getUsers,
  // updatePost,
  } from '../controllers/userController.js'
  import { protect } from '../../middlewares/authmiddleware.js'


  router.route('/register').post(registerUser).get(protect, getUsers)
  router.post('/login', authUser)
  router.get('/user/logout',logout)
  
  
  
  // router.post('/user/:id/post', post)
  // router.put('/user/:id/Updatepost', updatePost)


  export default router