require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'development') {
  console.log('Using development database')
  MONGODB_URI = process.env.MONGODB_URI_DEV
}

const SECRET = process.env.SECRET

module.exports = {
  MONGODB_URI,
  SECRET
}