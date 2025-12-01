const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testingLists = require('../utils/testing_lists')

describe('most blogs', () => {

  test('when list has only one blog, most frequent author is that ones', () => {
    const result = listHelper.mostBlogs(testingLists.listWithOneBlog)
    const expected = {
        author: "Edsger W. Dijkstra",
        blogs: 1
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when list has many blogs, most frequent author is the one with the most blogs', () => {
    const result = listHelper.mostBlogs(testingLists.listWithManyBlogs)
    const expected = {
        author: "Robert C. Martin",
        blogs: 3
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when list has no blogs, author is empty', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, {})
  })
})