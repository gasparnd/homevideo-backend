const MongoLib = require('../lib/mongo')

class UserMoviesService {
	constructor() {
		this.collection = 'userMovies'
		this.MongoDB = new MongoLib
	}

	async getUserMovies({ userId }) {
		const query = userId && { userId }
		const userMovies = await this.MongoDB.getAll(this.collection, query)

		return userMovies || []
	}

	async createUserMovie({ userMovie }) {
		const createdUserMovieId = await this.MongoDB.create(this.collection, userMovie)

		return createdUserMovieId
	}	

	async deleteUserMovie({ userMovieId }) {
		const deleteUserMovieId = await this.MongoDB.delete(this.collection, userMovieId.movieId)

		return deleteUserMovieId
	}
}

module.exports = UserMoviesService