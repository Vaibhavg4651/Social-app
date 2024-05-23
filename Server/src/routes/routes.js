import express from 'express'
const router = express.Router()
import {
  authUser, registerUser, logout, getUsers, getUserById, updateProfile
  } from '../controllers/userController.js'
  import{
    post,getPostByUserId,getPosts
  } from '../controllers/postController.js'
  import { protect } from '../../middlewares/authmiddleware.js'

  //user routes
  router.route('/v1/api/register').post(registerUser).get(protect, getUsers)
  router.post('/v1/api/login', authUser)
  router.get('/v1/api/user/logout',logout)
  router.put('/v1/api/user/:id',updateProfile)
  router.get('/v1/api/user/:id',getUserById)
  
  
  // post routes
  router.post('/v1/api/post', post)
  router.get('/v1/api/posts', getPosts)
  router.get('/v1/api/post/:id', getPostByUserId)


  export default router