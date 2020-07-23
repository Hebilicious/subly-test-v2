# Frontend

> ✨ Bootstrapped with Create Snowpack App (CSA).
> React
> Apollo Client

## How to use

Make sure you have a working development environment with node and yarn installed.
Refer to official documentations if needed.
Make sure the backend API is available at <http://localhost:4000/> !
Otherwise, you can edit the index.tsx with the correct address.

```bash
#From the root directory ...
cd frontend
yarn #Install node dependencies

#Application steps
yarn dev #Start a dev server

#Tests
yarn test #Run the tests suite

```

## Available Scripts

### yarn start

Runs the app in the development mode.
Open <http://localhost:8080> to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### yarn test

Run the tests (You'll get error in the console if your local backend isn't running).
In order to not rely on the network and the api being available, we could imagine a testing approach with
mocked network calls, like stated in the Apollo documentation, or even better, use a service worker based approach.

### yarn build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" or "@snowpack/plugin-parcel" to your `snowpack.config.json` config file.

### Q: What about Eject

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.
