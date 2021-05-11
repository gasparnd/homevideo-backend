const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const UserService = require('../../services/user')

passport.use(new BasicStrategy(async (email, password, cb) => {
	const userService = new UserService()

	try {
		const user = await userService.getUser({ email })

		if(!user) {
			return cb(boom.unauthorized(), false) 
		}

		if(!(await bcrypt.compare(password, user.password))) {
			return cb(boom.unauthorized(), false)
		}

		delete user.password

		return(null, user)
	} catch(err) {
		return cb(err)
	}
}))