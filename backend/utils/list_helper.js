const _ = require('lodash')
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {

  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}
const favoriteBlog = (blogs) => {

  const reducer = (accumulator, item) => {
    if (accumulator === 0 || accumulator.likes < item.likes){

      return {
        title: item.title,
        author: item.author,
        likes: item.likes
      }
    }else{
      return {
        title: accumulator.title,
        author: accumulator.author,
        likes: accumulator.likes
      }
    }
  }

  return blogs.length === 0
    ? null
    : blogs.reduce(reducer,0)
}
const lfavoriteBlog = (blogs) => {
  const resultObject = _.maxBy(blogs, 'likes')
  if (resultObject === undefined) {
    return resultObject
  }else{
    delete resultObject._id
    delete resultObject.__v
    delete resultObject.url
    return resultObject
  }
}
const mostBlogs = (blogs) => {
  const groupObject = _.groupBy(blogs, 'author')
  const resultObject = _.maxBy(
    _.map(groupObject, (o) => {
      return { author: o[0].author, blogs: o.length }
    }),
    'blogs')
  return resultObject
}
const mostLikes = (blogs) => {
  const groupObject = _.groupBy(blogs, 'author')
  const resultObject = _.maxBy(
    _.map(groupObject, (o) => {
      return {
        author: o[0].author,
        likes: o.reduce(
          (sum,item) => {
            return sum + item.likes
          },
          0
        )
      }
    }),
    'likes')
  return resultObject
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  lfavoriteBlog,
  mostBlogs,
  mostLikes
}