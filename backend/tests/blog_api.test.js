const bcrypt = require('bcrypt')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
describe('API BLOG TEST', () => {
  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('secret', 10)
    const users = helper.initialUsers.map((user) => {
      return { ...user, passwordHash:passwordHash }
    })
    await User.deleteMany({})
    await User.insertMany(users)
    const usersAtStart = await helper.usersInDb()
    const blogs = helper.initialBlogs.map((blog) => {
      return { ...blog, user: usersAtStart[0].id }
    })
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
  })
  describe('General tests', () => {
    test('general: blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('general: all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    test('general: identifying field is named id', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(Object.hasOwn(response.body[0], 'id'), true)
    })
  })
  describe('Viewing a specific blog tests', () => {
    test('viewing: succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]
      blogToView.user = blogToView.user.toString()

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      /**
       * we have to change field user of the resultBlog
       */
      const transformBlog = resultBlog.body
      transformBlog.user = resultBlog.body.user.id
      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('viewing: fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('viewing: fails with statuscode 400 if  id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })
  describe('Addition of a new blog tests', () => {
    test('addition: error if not token provide', async () => {
      const newBlog = {
        title: 'Test adding valid data',
        author: 'testAuthor',
        url: 'https://testUrl',
        likes: 9
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
    test('addition: succeeds with a valid data and a valid token', async () => {
      const newBlog = {
        title: 'Test adding valid data',
        author: 'testAuthor',
        url: 'https://testUrl',
        likes: 9
      }
      const  usersAtStart = await helper.usersInDb()
      const user = usersAtStart[1]
      const token = helper.tokenGenerator(user)
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)


      const titles = blogsAtEnd.map(n => n.title)
      assert(titles.includes('Test adding valid data'))
    })
    test('addition: if likes property is missing, default to 0', async () => {
      const newBlog = {
        title: 'If likes property is missing test',
        author: 'testAuthor',
        url: 'https://testUrl',
      }
      const  usersAtStart = await helper.usersInDb()
      const user = usersAtStart[1]
      const token = helper.tokenGenerator(user)
      const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(addedBlog.body.likes, 0)
    })
    test('addition: if title or url is missing return 400 bad request', async () => {
      const newBlog = {
        author: 'testAuthor',
      }
      const  usersAtStart = await helper.usersInDb()
      const user = usersAtStart[1]
      const token = helper.tokenGenerator(user)
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      const blogsAtEnd = await helper.blogsInDb ()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    })
  })
  describe('Deletion of a blog tests', () => {
    test('deletion: succeeds with status code 204 if id is valid and correct token', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      const  usersAtStart = await helper.usersInDb()
      const user = usersAtStart[0]
      const token = helper.tokenGenerator(user)
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      const titles = blogsAtEnd.map(n => n.title)
      assert(!titles.includes(blogToDelete.title))
    })
    test('deletion: fail with status code 401 if id is valid and user is not owner of blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      const  usersAtStart = await helper.usersInDb()
      const user = usersAtStart[1]
      const token = helper.tokenGenerator(user)
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
    test('deletion: return with 204 status code for invalid id', async () => {
      const blogIdToDelete = await helper.nonExistingId()
      const  usersAtStart = await helper.usersInDb()
      const user = usersAtStart[1]
      const token = helper.tokenGenerator(user)
      await api
        .delete(`/api/blogs/${blogIdToDelete}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
    })
  })
  describe('Update a blog tests', () => {
    test('update: succeeds update with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const blogUpdated = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 100 })
        .expect(200)

      assert.strictEqual(blogUpdated.body.likes, 100)
    })
  })
  describe('Token tests', () => {
    test('token: status code 401 if fake token, error: token invalid', async () => {
      const result = await api
        .post('/api/blogs')
        .send({})
        .set('Authorization', 'Bearer faketoken')
        .expect(401)
      assert.strictEqual(result.body.error, 'token invalid')
    })
    test('token: status code 401 if not token, error: token invalid', async () => {
      const result = await api
        .post('/api/blogs')
        .send({})
        .expect(401)
      assert.strictEqual(result.body.error, 'token invalid')
    })
    test('token: status code 401 if token but user not found in BD, error: user not found', async () => {
      const token = helper.tokenGenerator()
      const result = await api
        .post('/api/blogs')
        .send({})
        .set('Authorization', `Bearer ${token}`)
        .expect(401)
      assert.strictEqual(result.body.error, 'user not found')
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
