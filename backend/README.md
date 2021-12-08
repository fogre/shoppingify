# Shoppingify backend

API-server for the [shoppingify devChallenge](https://devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x)

The server runs on Apollo-Server-Express and uses Mongoose schemas for the in cloud MongoDB.

Testing uses jest, mongodb-memory-server to run the DB in memory, and apollo-server-integration-testing to mock HTTP headers for the GraphQL server.

## How to install
* Clone the repository
* Create an account for the cloud DB in [MongoDB](https://www.mongodb.com/) and create a new cluster
* Create an .env file with variables you find from .env-public (MongoDB uri's and jwt-secret)
* Install modules ("npm install")

## Available scripts

#### dev
Starts the server in development mode and uses the MongoDB developement database

### test ["path"]
Runs all tests or a single single testfile in ["path"]

#### initDevDB
* Runs node initDbDefaults to developement MongoDB uri.
* Seeds DB with default data, that can be found in ./data/defaultData
* Takes optional npm cli-argument --dropdb. If --dropDB is set it drops the developement database before seeding.

To seed the production DB run "node initDbDefaults.js"

#### watch
Runs eslint in watch mode


