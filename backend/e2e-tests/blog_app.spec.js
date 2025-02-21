
const { test, expect, beforeEach, afterEach, describe } = require('@playwright/test')
const { initialUsers, loginWith } = require('./helper')
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    //empty the bd
    await request.post('/api/testing/reset')
    //create a user for testing
    for (const user of initialUsers){
      await request.post('/api/users', {
        data: user
      })
    }
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    let locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, initialUsers[0].username, initialUsers[0].password)
      const alert = page.getByRole('alert')
      await expect(alert).toBeVisible()
      await expect(page.getByText(`${initialUsers[0].name} loggin successfully`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser01', 'wrongpassword')
      const alert = page.getByRole('alert')
      await expect(alert).toBeVisible()
      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
    afterEach(async ({ page }) => {
      await page.evaluate(() => localStorage.clear())
      await page.context().clearCookies()
    })

  })
})