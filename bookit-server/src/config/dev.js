import dotenv from "dotenv"
dotenv.config()

module.exports = {
	dbURL: process.env.MONGODB_URI,
}
