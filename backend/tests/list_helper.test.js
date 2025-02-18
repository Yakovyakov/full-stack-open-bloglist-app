const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]
const listWhithOneBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
]


describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})
describe('total likes', () => {
  test('of empty array is 0', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWhithOneBlog)
    assert.strictEqual(result, 7)
  })
  test('of a bigger list is calculate right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})
describe('favorite blog', () => {
  test('when list is empty result is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })
  test('when list has only one blog returns {title,author and likes} of that', () => {
    const expectedObject = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    }
    const result = listHelper.favoriteBlog(listWhithOneBlog)
    assert.deepStrictEqual(result, expectedObject)
  })
  test('of a bigger list returns {title,author and likes} of the blog with the most likes', () => {
    const expectedObject = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, expectedObject)
  })

})
describe('favorite blog with lodash', () => {
  test('when list is empty result is undefined', () => {
    const result = listHelper.lfavoriteBlog([])
    assert.strictEqual(result, undefined)
  })
  test('when list has only one blog returns {title,author and likes} of that', () => {
    const expectedObject = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    }
    const result = listHelper.lfavoriteBlog(listWhithOneBlog)
    assert.deepStrictEqual(result, expectedObject)
  })
  test('of a bigger list returns {title,author and likes} of the blog with the most likes', () => {
    const expectedObject = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    const result = listHelper.lfavoriteBlog(blogs)
    assert.deepStrictEqual(result, expectedObject)
  })
})
describe('most blogs with lodash', () => {
  test('when list is empty result is undefined', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, undefined)
  })
  test('when list has only one blog returns {author and blogs(1)} of that', () => {
    const expectedObject = {
      author: 'Michael Chan',
      blogs: 1
    }
    const result = listHelper.mostBlogs(listWhithOneBlog)
    assert.deepStrictEqual(result, expectedObject)
  })
  test('of a bigger list returns {author and blogs(n)} of the author with most blogs', () => {
    const expectedObject = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, expectedObject)
  })
})
describe('most likes with lodash', () => {
  test('when list is empty result is undefined', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, undefined)
  })
  test('when list has only one blog returns {author and likes(1)} of that', () => {
    const expectedObject = {
      author: 'Michael Chan',
      likes: 7
    }
    const result = listHelper.mostLikes(listWhithOneBlog)
    assert.deepStrictEqual(result, expectedObject)
  })
  test('of a bigger list returns {author and likes(n)} of the author with most likes', () => {
    const expectedObject = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, expectedObject)
  })
})