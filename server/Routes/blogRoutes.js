import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Blog from '../Models/blogModel.js'

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const blogposts = await Blog.find({})

    res.json(blogposts)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const blogpost = await Blog.findById(req.params.id)

    if (blogpost) {
      res.json(blogpost)
    } else {
      res.status(404).json({ message: 'Blog post not found' })
    }
  })
)

export default router
