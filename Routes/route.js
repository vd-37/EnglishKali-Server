import express from 'express'
import { uploadImage, getImage } from '../controller/image-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../controller/post-controller.js';
import {signupUser, loginUser} from "../controller/user-controller.js";
import upload from "../utils/upload.js"

// upload is the middleware here, helps the images get uploaded to mongoDB.
// uploadImage is the response sent by backend
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

router.post('/file/upload', upload.single('file') , uploadImage)
router.get('/file/:filename', getImage)

router.post('/create', authenticateToken, createPost)
router.get('/posts', authenticateToken, getAllPosts)
router.get('/post/:id', authenticateToken, getPost)
router.put('/update/:id', authenticateToken, updatePost)
router.delete('/delete/:id', authenticateToken, deletePost)

export default router;
