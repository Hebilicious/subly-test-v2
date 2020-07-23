# Subly - Fullstack test v2.0

This exercise is intended to allow you to demonstrate your skills in building a small typescript-based
crud application. your submission will be assessed on the following criteria:

1. Grasp and understanding of the JS/Typescript
2. Writing clean, concise and maintainable code
3. Ability to verify the correctness of the solution
4. Grasp and understanding of SQL/Postgres

You are encouraged to treat this as a microcosm of a real project, so approach it as you would any
other project. Typescript, React and Postgres are required.

Please include a README with your submission which describes how to run the project and
explains the approach you took to producing the solution

Submit your solution by either sending a link to github or send us your zip version of the code via
Email.

We would deploy your code as per your description and test if. We care about code quality best
practices and your attention to details.

Exercise description
Subly, is designing a reporting api and a dashboard in React which allow the team to understand
user behaviors like, number of files uploaded, type of the files, duration in seconds, country of origin
of user and more...
Domain
A FILE is considered a video file ".mp4, .wav", users upload to get it the platform and get it
transcribed. at a minimum have the attributes: Name, uuid, type, duration, size
A USER is a person registered with the platform. At minimum we have attributes like: NAme, id,
country of origin

## Requirements

Deliver a crud api that can with minimum three resource (Users, Files, Reports)

- [x] Total number of files uploaded per user.
- [x] Total number of files divided per type of the file.
- [x] Average file size of all and per user
- [x] Average duration of all uploads and per user
- [x] Filter by Date for any resources & pagination (note: createdAt is only implememented on the User and File tables, more advanced logic can be implemented with an updatedAt field.)

Deliver a client application in React (if Possible)

- [x] List users
- [x] List files
- [x] A basic Dashboard with Reports (Number of users, number of videos, type of videos, size of
      videos) (Both an overall and averages)

Your Solution

- [x] MUST have been written in Typescript
- [x] MUST have Postgres/SQL as the DB
- [x] MUST have unit tests & code quality practices.
- [x] MUST Be fully functional
- [x] SHOULD Explain how you architecture the app

## Explanations

### Architecture

The project will live in a monorepository.
To solve the requirements we'll decouple the API and the frontend.

The backend will be a standalone node application.
The frontend will be a standalone react application.

It would be possible to use a monolithic framework such as Redwood JS.
There are many pros and cons of both approach, a microservice architecture is harder to reason with.
A microservice based architecture can be scaled and deployed independently.
It also allow you to use the right tool for the job easily, since services are decoupled.
However here we'll showcase how to manually build a graphQL API and a React based SPA.

- The backend will be a node service with one entrypoint, making it very easy to deploy.
  Refer to the backend README for more details.

- The frontend will be a SPA, that can easily be deployed as a well.
  Refer to the frontend README for more details.

Run both projects in separated terminals.
Make sure that the urls are correct for everything. Refer to each directory README for more informations.

### TL:DR Intructions

#### API

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
yarn dev #Start a dev server, default to http://localhost:4000/
```

#### Client

```bash
#From the root directory ...
cd frontend

yarn #Install node dependencies
yarn dev #Start a dev server, default to http://localhost:8080/
```
