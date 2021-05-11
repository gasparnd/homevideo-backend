// DEBUG=app:* node scripts/mongo/seedApiKeys.js

const chalk = require('chalk')
const crypto = require('crypto')
const debug = require('debug')('app:scripts:api-keys')
const MongoLib = require('../../lib/mongo')

const generateRandomToken = () => {
	const buffer = crypto.randomBytes(32)
	return buffer.toString('hex')
}

const seedApiKeys = async () => {
	try {
		const mongoDB = new MongoLib()

		const promises = apiKeys.map(async apiKey => {
			await mongoDB.create('api-keys', apiKey)
		})

		await Promise.all(promises)
		debug(chalk.green(`${promises.length} api keys have been created succesfully`))
		return process.exit(0)
	} catch(err) {
		debug(chalk.red(error))
		process.exit(1)
	}
}

const adminScopes = [
	'signin:auth',
	'signup:auth',
	'read:movies',
	'create:movies',
	'update:movies',
	'delete:movies',
	'read:user-movies',
	'create:user-movies',
	'delete:user-movies'
]

const publicScopes = [
	'signin:auth',
	'signup:auth',
	'read:movies',
	'read:user-movies',
	'create:user-movies',
	'delete:user-movies'
]

const apiKeys = [
	{
		token: generateRandomToken(),
		scopes: adminScopes
	},
	{
		token: generateRandomToken(),
		scopes: publicScopes
	}
]

seedApiKeys()