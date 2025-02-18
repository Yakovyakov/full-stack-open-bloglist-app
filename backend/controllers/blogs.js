const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// eslint-disable-next-line no-unused-vars
const User = require('../models/user')
const middleware= require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (blog) {
    response.json(blog)
  }else{
    response.status(404).end()
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()


  user.blogs=user.blogs.concat(savedBlog._id)
  await user.save()

  savedBlogPopulate = await Blog.populate( savedBlog, { path: 'user',  select: '-blogs' })

  response.status(201).json(savedBlogPopulate)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const id = request.params.id
  const blog = await Blog.findById(id)
  if ( !blog || blog.user.toString() === user._id.toString() ){
    await Blog.findByIdAndDelete(id)

    /*
    * delete item blog from user.blogs
    */
    user.blogs = user.blogs.filter((item) => item.toString() !== id)

    await user.save()
    response.status(204).end()
  }else{
    response.status(401).json({ error: 'Unauthorized' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  const updatedBlog=await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
})
blogsRouter.post('/:id/comments', async (request, response) => {

  const { comment } = request.body

  if (!comment) {
    return response.status(400).json({ error: 'comment is missing' })
  }

  const blog = await Blog.findById(
    request.params.id,
  ).populate('user', { username: 1, name: 1 })

  blog.comments = blog.comments.concat(comment)

  const updatedBlog = await blog.save()
  response.status(201).json(updatedBlog)
})
module.exports = blogsRouter
