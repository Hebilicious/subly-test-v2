# Overall architecture

## Backend

- Prisma : Typesafe Database typescript utilities
- GraphQL : Nexus-Schema + Appollo: Code first schema building
- Docker : To run postgres

### Postgres

Postgres is run using docker. Make sure you have docker and docker-compose on your system.

1. Run the postgres container
   Running `yarn db:start` will launch the container with the following settings : `postgresql://subly:password@localhost:5432/subly?schema=public`
2. Creating the tables
   The database user, name and schema names are handled with docker, however to have data inside our DB there's a few approaches :
   1. Run a script that creates our tables, then run `prisma introspect` to generate a prisma client from our tables that we can use in our application
   2. Use the `prisma migrate` tool to geneate and apply db migrations according to the prisma.schema file.
      This demo use the 2nd option, therefore you only need to run `yarn db:migrate` (An initial migration is already setup)
3. Seed the data `yarn db:seed` : This will create some dummy data. You can flush the db by running `yarn db:reset`

- Make sure the connection URL in the prisma.schema is pointing to a valid postgres connection string. In a a real application we would use environment variables.
- This docker file try to keep things as simple as possible for demonstration purpose.

### GraphQL

We're using a code-first approach with Apollo and the Nexus framework to generate our schema.graphql file from typescript.
This Apollo application can be served like any express application. We run it locally here.
We're using the Nexus-prisma plugin to expose CRUD methods easily.

## Frontend

- React
- React-query : Simple graphql
