/* eslint-disable no-undef */
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders content', () => {
  const blog = {
    'title': 'Prueba',
    'author': 'Autor',
    'url': 'url',
    'likes': 6,
    'user': 'Nabo'
  }

  const { container } = render(<Blog blog={blog} onLike={() => {return}} user={null} onRemove={() => {return}}/>)

  const title = container.querySelector('.blog-title')
  const details = container.querySelector('.blog-visible')


  expect(title).toHaveTextContent('Prueba by Autor')
  expect(details).toHaveStyle('display: none')
})

test('clicking the button shows details', async () => {
  const blog = {
    'title': 'Prueba',
    'author': 'Autor',
    'url': 'url',
    'likes': 6,
    'user': 'Nabo'
  }

  const { container } = render(<Blog blog={blog} onLike={() => {return}} user={null} onRemove={() => {return}}/>)

  const details = container.querySelector('.blog-visible')
  const button = container.querySelector('.show-button')
  const user = userEvent.setup()

  await user.click(button)


  expect(details).not.toHaveStyle('display: none')
  expect(details).toHaveTextContent('URL: urlLikes: 6')
})

test('clicking the like button twice calls twice the handler', async () => {
  const blog = {
    'title': 'Prueba',
    'author': 'Autor',
    'url': 'url',
    'likes': 6,
    'user': 'Nabo'
  }

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} onLike={mockHandler} user={null} onRemove={() => {return}}/>)

  const showButton = container.querySelector('.show-button')
  const user = userEvent.setup()

  await user.click(showButton)

  const likeButton = container.querySelector('.like-button')

  await user.click(likeButton)
  await user.click(likeButton)


  expect(mockHandler.mock.calls).toHaveLength(2)
})

