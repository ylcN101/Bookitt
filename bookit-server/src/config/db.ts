import mongoose from 'mongoose'

const initializeDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB', err)
    })
}

export default initializeDB
