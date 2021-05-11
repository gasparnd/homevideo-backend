const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('@hapi/boom')

const UsersService = require('../../../services/user')
const { config } = require('../../../config')

passport.use(
	new Strategy({
		secretOrKey: config.authJwtSecret,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
	},
	async (tokenPayload, cb) => {
		const usersService = new UsersService()

		try {
			const user = await usersService.getUser({email: tokenPayload.email})

			if(!user) {
				return cb(boom.unauthorized(), false)
			}

			delete user.password

			return cb(null, { ...user, scopes: tokenPayload.scopes})
		} catch(err) {
			return cb(err, false)
		}
	})
)