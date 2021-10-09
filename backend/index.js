const mongoose = require('mongoose')
//server
const { createApolloServer, startServer } = require('./graphql/createApolloServer')
//utils
const config = require('./utils/config')

const port = process.env.PORT || 4000
//DB connection
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(e => console.log('error connecting to MongoDB:', e.message))

//Create and start server
createApolloServer()
  .then(server => {
    startServer(server, port)
  })
  .catch(e => console.log('error starting server:', e.message))