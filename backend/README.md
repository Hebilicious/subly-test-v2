# Overall Backend Architecture

-   Requirements : Typescript, Postgres, Unit tests, Explanations
-   Prisma : Typesafe Database typescript utilities
-   GraphQL : Nexus-Schema + Appollo: Code first schema building
-   Docker : To run postgres

## How to use

Make sure you have a working development environment with node, docker and yarn installed.
Refer to official documentations if needed (Using the latest docker desktop version works very well).

```bash
#From the root directory ...
cd backend
yarn #Install node dependencies

#DB Steps
yarn db:start #Start the docker compose database
yarn db:migrate #Create empty tables according to the migration directory
yarn db:seed #Seed the database with random dummy data

#Application steps
yarn generate #Generate the db client and graphql schema
yarn dev #Start a dev server with

#Tests
yarn test #Run the tests suite

#Panic
yarn db:flush #Flush the database
yarn db:stop #Stop the database container
yarn db:destroy #Remove the container and the data volume
yarn db:create-migration #Advanced used case of rolling your own migration, check prisma migrate docs

```

### Important Helpers

There's a few different local server that you can use for your convenience.

-   GraphQL Playground : After running `yarn dev` Apollo attach a playground at the dev server url, visit it to try it out.
-   API documentation: `yarn docs` will generate a static webpage with the API documentation and serve it.
-   DB admin GUI : `yarn gui` will serve a headless admin GUI that you can use to visualize your tables.

## Postgres and docker detailled explanations

Postgres is run using docker. Make sure you have docker and docker-compose on your system.

1. Running `yarn db:start` will launch the container with the following connection string : `postgresql://subly:password@localhost:5432/subly?schema=public`. You can connect to another database if you wish, by changing this connection string. The Raw queries in Query.ts are hardcoded, so be careful if you change things around. If you use your own Postgres configuration, use a postgres schema named public.

2. Creating the tables
   Before the data can be seeded, the database schema needs to be applied to the database. There's a few ways to do this.

    1. Run SQL statements to creates our tables, then run `prisma introspect` to generate a prisma client in sync with the database schema (gives you typesafety and autocompletion).
    2. Use the `prisma migrate` tool to geneate and apply db migrations according to the prisma.schema file. It is under an experimental flag atm, but it works. This demo use the 2nd option, therefore you only need to run `yarn db:migrate` (An initial migration is already commited with this Repo)

    After either of those steps, run `yarn generate` to make sure the generated client and schema are in sync.

3. Seeding the data. `yarn db:seed` will create some dummy data with the prisma client and the faker library. You can flush the db by running `yarn db:reset`

-   Make sure the connection URL in the prisma.schema is pointing to a valid postgres connection string. In a a real application we would leverage something like environment variables for security concerns.
-   This docker file try to keep things as simple as possible for demonstration purpose.

## GraphQL extra explanations

-   We're using a code-first approach with Apollo and the Nexus framework to generate our schema.graphql file from typescript. The Schema is defined in the schema.ts file. Think of Nexus as a higher level implementation of graphql-js, that comes with a prisma plugin to reduce a LOT of the typical CRUD boilerplate.
-   Why do we need to `yarn generate` : The schema.graphql file is generated from the source code directly. This commands make sure the grqphql schema is in sync with the latest db schema. It also fixes the typescript "magic" in the schema file.
-   Performances: Many things can be done to improve the raw performances of such a setup. This specific implementation worries more about code quality practises than it does about performances.
-   Nexus and Prisma are just libraries, therefore, this API is just an Apollo application that can be served like any node application. The entry point is server.ts. Locally it runs with `ts-node-dev`, but compiling it from TS to JS then running it with node / pm2 / docker / k8 etc would be painless. Since it's just a node application, it can easily be served by FAAS like AWS lambda, or served by a container with something like AWS fargate.
-   We're using the Nexus-prisma plugin to "proxy" model definitions and CRUD methods easily. The prisma tools (cli, client) are bundled by nexus-prisma-plugin and need to be kept out of the dependencies.
-   The test suite should tell you that you have everything setup properly `yarn test`
-   Once the schema is built, you can use `yarn docs` to serve static docs
