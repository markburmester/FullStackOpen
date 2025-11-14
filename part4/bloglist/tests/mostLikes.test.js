const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testingLists = require('../utils/testing_lists')

describe('most likes', () => {

  test('when list has only one blog, most likes is that ones author', () => {
    const result = listHelper.mostLikes(testingLists.listWithOneBlog)
    const expected = {
        author: "Edsger W. Dijkstra",
        likes: 5
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when list has many blogs, is the one with the most likes', () => {
    const result = listHelper.mostLikes(testingLists.listWithManyBlogs)
    const expected = {
        author: "Edsger W. Dijkstra",
        likes: 17
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when list has no blogs, author is empty', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, {})
  })
})