# Shoppingify frontend

Frontend for the [Shoppingify devChallenge.](https://devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x)

Built with Next, TypeScript and URQL. Types and GraphQL queries generated with GraphQL Codegen.

Styling by Styled Components.

[View demo!](https://theshoppingifyapp.vercel.app)

## How to install
* Clone the repository
* Npm install
* Create optional .env.local file with NEXT_PUBLIC_LOCAL_DEV_DB_URI variable to your local dev backend IP address

## Available scripts
npm run
* dev (start the server in dev mode)
* build (build the application)
* lint (run eslint)
* fix (run eslint with --fix)
* generate (Generates the types and typed GraphQL documents with GraphQL Codegen. [Backend](https://github.com/fogre/shoppingify/tree/main/backend) needs to be running on your local machine. Exports to ./graphql/generated.ts)