/* eslint-disable no-unused-vars */
const { expect }= require('@playwright/test')
const initialBlogs = [
  {
    title: '01blog-title',
    author: '01blog-author',
    url: '01blog-url'
  },
  {
    title: '02blog-title',
    author: '02blog-author',
    url: '02blg-url'
  },
  {
    title: '03blog-title',
    author: '03blog-author',
    url: '03blog-url'
  },
]
const initialUsers = [
  {
    name: 'Test user 01',
    username: 'testuser01',
    password: 'secret'
  },
  {
    name: 'Test user 02',
    username: 'testuser02',
    password: 'secret'
  }
]
const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').locator('input').fill(username)
  await page.getByTestId('password').locator('input').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

module.exports = { initialBlogs, initialUsers, loginWith }