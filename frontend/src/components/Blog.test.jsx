/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { MemoryRouter } from 'react-router-dom'

describe('Blog component tests', () => {
  let container
  beforeEach(() => {
    const blog = {
      title: '01blog',
      author: 'testAuthor',
      url: 'https://01blog',
      likes: 0,
      user: {
        username:'01username',
        name:'01 username',
      }
    }
    /**
     * The Blog component must be wrapped in a
     * MemoryRouter or BrowserRouter during testing
     */
    container = render(
      <MemoryRouter>
        <Blog blog={blog}/>
      </MemoryRouter>).container
  })
  describe('Blog List Tests, step 1', () => {
    test('title and author visible', () => {
      let element = screen.getByText('01blog')
      console.log(screen)

      expect(element).toBeDefined()
      expect(element).toBeVisible()
      element = screen.getByText('by testAuthor')
      expect(element).toBeDefined()
      expect(element).toBeVisible()

    })
  })
})