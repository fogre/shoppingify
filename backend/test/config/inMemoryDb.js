const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
//data
const {
  seedDBwithDefaultUser,
  seedDBwithDefaultData
} = require('../../data/seedDatabaseHelpers')

let mongod

const connectDB = async () => {
  try {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()

    await mongoose.connect(uri)
  } catch (e) {
    console.log('ERROR CONNECTING DB: ', e)
  }
}

const dropAndCloseDB = async () => {
  try {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
  } catch (e) {
    console.log('ERROR DROPPING AND CLOSING DB: ', e)
  }
}

const seedWithDefaultData = async () => {
  await seedDBwithDefaultData()
  await seedDBwithDefaultUser()
}

module.exports = {
  connectDB,
  dropAndCloseDB,
  seedWithDefaultData
}