const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    
    const response = await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testpass'
      }
    })
  
    await page.goto('http://localhost:5173')
    
  
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in').all()
    const textboxes = await page.getByRole('textbox').all()
    
    expect(locator[0]).toBeVisible()
    
    expect(textboxes).toHaveLength(2)
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('testuser')
      await textboxes[1].fill('testpass')
      
      await page.getByRole('button', { name: 'Log in' }).click()
      
      await expect(page.getByText('testuser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('testuser')
      await textboxes[1].fill('wrongpassword')
      
      await page.getByRole('button', { name: 'Log in' }).click()
      
      await expect(page.getByText('invalid username or password')).toBeVisible()
      await expect(page.getByText('testuser logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('testuser')
      await textboxes[1].fill('testpass')
      await page.getByRole('button', { name: 'Log in' }).click()
      await page.getByText('testuser logged in').waitFor()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()
      
      const inputs = await page.getByRole('textbox').all()
      await inputs[0].fill('Test Blog Title')
      await inputs[1].fill('Test Author')
      await inputs[2].fill('http://testblog.com')
      
      await page.getByRole('button', { name: 'Create blog' }).click()
      
      await expect(page.getByText('Test Blog Title by Test Author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()
      
      const inputs = await page.getByRole('textbox').all()
      await inputs[0].fill('Likeable Blog')
      await inputs[1].fill('Like Author')
      await inputs[2].fill('http://likeable.com')
      
      await page.getByRole('button', { name: 'Create blog' }).click()
      await page.getByText('Likeable Blog by Like Author').waitFor()
      
      await page.getByRole('button', { name: 'show' }).click()
      
      const likesText = await page.getByText(/Likes: \d+/).textContent()
      const initialLikes = parseInt(likesText.match(/\d+/)[0])
      
      await page.getByRole('button', { name: '👍' }).click()
      
      await expect(page.getByText(`Likes: ${initialLikes + 1}`)).toBeVisible()
    })

    test('creator can remove blog', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()
      
      const inputs = await page.getByRole('textbox').all()
      await inputs[0].fill('Blog to Delete')
      await inputs[1].fill('Delete Author')
      await inputs[2].fill('http://delete.com')
      
      await page.getByRole('button', { name: 'Create blog' }).click()
      await page.getByText('Blog to Delete by Delete Author').waitFor()
      
      page.on('dialog', dialog => dialog.accept())
      
      await page.getByRole('button', { name: 'remove' }).click()
      
      await expect(page.getByText('Blog to Delete by Delete Author')).not.toBeVisible()
    })

    test('only creator can see remove button', async ({ page, request }) => {
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Second User',
          username: 'seconduser',
          password: 'secondpass'
        }
      })

    
      await page.getByRole('button', { name: 'Create new blog' }).click()
      
      const inputs = await page.getByRole('textbox').all()
      await inputs[0].fill('Creator Blog')
      await inputs[1].fill('Creator Author')
      await inputs[2].fill('http://creator.com')
      
      await page.getByRole('button', { name: 'Create blog' }).click()
      await page.getByText('Creator Blog by Creator Author').waitFor()
      
      await page.getByRole('button', { name: 'Log out' }).click()
      
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('seconduser')
      await textboxes[1].fill('secondpass')
      await page.getByRole('button', { name: 'Log in' }).click()
      await page.getByText('seconduser logged in').waitFor()
      
      await page.getByRole('button', { name: 'show' }).click()
      
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test.only('blogs are ordered by likes', async ({ page }) => {

      const blogs = [
        { title: 'Low Likes Blog', author: 'Author A', url: 'http://low.com' },
        { title: 'High Likes Blog', author: 'Author B', url: 'http://high.com' },
        { title: 'Medium Likes Blog', author: 'Author C', url: 'http://medium.com' }
      ]

      for (const blog of blogs) {
        await page.getByRole('button', { name: 'Create new blog' }).click()
        const inputs = await page.getByRole('textbox').all()
        await inputs[0].fill(blog.title)
        await inputs[1].fill(blog.author)
        await inputs[2].fill(blog.url)
        await page.getByRole('button', { name: 'Create blog' }).click()
        await page.getByText(`${blog.title} by ${blog.author}`).waitFor()
      }

      const showButtons = await page.getByRole('button', { name: 'show' }).all()
      
      await showButtons[0].click()
      
      await showButtons[0].click()
      
      await showButtons[0].click()
      

      const likeButtons = await page.getByRole('button', { name: '👍' }).all()
      
      await likeButtons[0].click({ force: true })
      
      
      for (let i = 0; i < 5; i++) {
        await likeButtons[1].click({ force: true })
        
      }
      
      for (let i = 0; i < 3; i++) {
        await likeButtons[2].click({ force: true })
        
      }
      

      await page.reload()
      await page.waitForLoadState('networkidle') 

      const blogTitles = await page.locator('.blog-title').allTextContents()
      console.log("blogTitles: ", blogTitles)
      expect(blogTitles[0]).toContain('High Likes Blog')
      expect(blogTitles[1]).toContain('Medium Likes Blog')
      expect(blogTitles[2]).toContain('Low Likes Blog')
    })
  })
})