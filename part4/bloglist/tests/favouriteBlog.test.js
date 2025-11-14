const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testingLists = require('../utils/testing_lists')

describe('favourite blog', () => {

  test('when list has only one blog, favourite is that one', () => {
    const result = listHelper.favouriteBlog(testingLists.listWithOneBlog)
    const expected = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when list has many blogs, favourite is the one with most likes', () => {
    const result = listHelper.favouriteBlog(testingLists.listWithManyBlogs)
    const expected = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when list has no blogs, favourite is empty', () => {
    const result = listHelper.favouriteBlog([])
    assert.deepStrictEqual(result, {})
  })
})