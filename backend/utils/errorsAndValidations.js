const { UserInputError, AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
//utils
const config = require('../utils/config')
//models
const User = require('../models/user')

const authenticateUser = context => {
  if (!context.currentUser) {
    throw new AuthenticationError('not authenticated')
  }
  return context.currentUser
}

const throwUserInputError = (error, args) => {
  throw new UserInputError(error.message, {
    invalidArgs: args,
  })
}

const verifyCurrentUser = async req => {
  /*get developement user for easier development
  if (process.env.NODE_ENV === 'development') {
    const currentUser = await User.findOne({ email: 'dev@user.com' })
    return currentUser
  }*/
  //production authorization
  try {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return currentUser
    }
    return null
  } catch(e) {
    console.log(e)
  }
}

//Date validation
const sameYearAndMonth = (d1, d2) => {
  if (!d1 || !d2) {
    return false
  }

  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
}

const validateDate = (dateInDB, newDate) => {
  if (!dateInDB || dateInDB <= newDate) {
    return new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate()
    )
  }
  throw new UserInputError('Your new date is in the past.')
}

module.exports = {
  authenticateUser,
  throwUserInputError,
  verifyCurrentUser,
  sameYearAndMonth,
  validateDate
}