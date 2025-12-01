const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testingLists = require('../utils/testing_lists')

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(testingLists.listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has many blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(testingLists.listWithManyBlogs)
    assert.strictEqual(result, 36)
  })

  test('when list has no blogs, likes equal zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
})