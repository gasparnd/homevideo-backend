const assert = require('assert')
const buildMessage = require('../utils/buildMessage')

describe('utils - buildMessage', () => {
	describe('when receives an entity and an action', () => {
		it('should return the respective message', () => {
			const result = buildMessage('movie', 'create')
			const expect = 'movie created'
			assert.strictEqual(result, expect)
		})
	})
	describe('when recives an entity and an action is a list', () => {
		it('should return the respective message with the entity in plural', () => {
			const result = buildMessage('movie', 'list')
			const expect = 'movies listed'
			assert.strictEqual(result, expect)
		})
	})
	describe('when recives an entity and an action is a find', () => {
		it('should return the respective message with the entity in plural', () => {
			const result = buildMessage('movie', 'find')
			const expect = 'movies find'
			assert.strictEqual(result, expect)
		})
	})
	describe('when recives an entity and an action is updated', () => {
		it('should return the respective message with the action in plural', () => {
			const result = buildMessage('movie', 'update')
			const expect = 'movie updated'
			assert.strictEqual(result, expect)
		})
	})
	describe('when recives an entity and an action is deleted', () => {
		it('should return the respective message with the action in plural', () => {
			const result = buildMessage('movie', 'delete')
			const expect = 'movie deleted'
			assert.strictEqual(result, expect)
		})
	})
})