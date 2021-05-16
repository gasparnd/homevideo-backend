require('dotenv').config()

const config = {
	dev: process.env.NODE_ENV !== 'production',
	port: process.env.PORT || 8000,
	apiUrl: process.env.API_UR,
	apiKeyToken: process.env.PUBLIC_KEY_TOKEN,
	googleClientId: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
}

module.exports = { config: config }