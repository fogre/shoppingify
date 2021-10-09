const db = require('./inMemoryDb')

beforeAll(async () => {
  await db.connectDB()
  await db.seedWithDefaultData()
})

afterAll(async () => {
  await db.dropAndCloseDB()
})
