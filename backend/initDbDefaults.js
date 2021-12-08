const mongoose = require('mongoose')
//utils
const config = require('./utils/config')
//data
const {
  seedDBwithDefaultUser,
  seedDBwithDefaultData
} = require('./data/seedDatabaseHelpers')

/*
  Connect to mongo and set intial data.
  Drop dev database first if --dropDB is set TRUE and the app run in dev mode
*/
mongoose.connect(config.MONGODB_URI)
  .then(async () => {
    console.log('connected to MongoDB')
    if (
      process.env.npm_config_dropdb
      && process.env.NODE_ENV === 'development'
    ) {
      console.log('Dropping development database...')
      await mongoose.connection.dropDatabase()
    }

    await seedDBwithDefaultUser()
    await seedDBwithDefaultData()
  })
  .then(() =>
    mongoose.connection.close()
      .then(() => console.log('MongoDB connection closed'))
      .catch(e => console.log('error closing MongoDB connection:', e.message))
  )
  .catch(e => console.log('ERROR when dealing with MongoDB:', e.message))