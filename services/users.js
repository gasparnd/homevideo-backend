const MongoLib = require('../lib/mongo')
const bcrypt = require('bcrypt')


class UsersService {
	constructor() {
		this.collection = 'user'
		this.mongoDB = new MongoLib()
	}

	async getUser({ email }) {
		const [ user ] = await this.mongoDB.getAll(this.collection, { email })
		return user
	}

	async createUSer({ user }) {
		const { name, email, password } = user
		const hashedPassword = await bcrypt.hash(password, 10)

		const createUserId = await this.mongoDB.create(this.collection, {
			name, 
			email,
			password: hashedPassword
		})

		return createUserId
	}
}

module.exports = UsersService