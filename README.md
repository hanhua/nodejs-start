# Create NodeJS React App with server, deployable on Azure

The starter project for an NodeJS React app with both client and server code.

## Versions ahd layout

The planned version we are installing are as following:

- NodeJS 18 (18.16.0)
- React 18
- React Router
- Babel 7
- Webpack 5
- TypeScript 5
- Express 6
- MUI 5
- ESLint

The planned directory layout

- `assets`: Static files, HTML/CSS/images not imported to TSX
- `client`: Client code (React/JSX/TSX)
- `server`: Server code (Express/JS/TS)
- `mutual`: Shared code (TS)
- `dist`: Compilation output for disttribution (git ignored)

## Steps

1. First install `nodejs` and `npm` in the operating system.
   In the rest of this memo, we assume Linux.

2. Create a project directory and run `npm init -y` there to create an initial
   `package.json`.

3. Install React, Babel, Webpack, and Webpack loaders

        npm install --save-dev react react-dom react-router react-router-dom \
            @babel/core @babel/preset-env @babel/preset-react \
            webpack webpack-cli webpack-dev-server html-webpack-plugin \
            babel-loader style-loader css-loader file-loader

4. Create `babel.config.json`, `webpack.config.js`, `assets/index.html`,
  `client/App.js`, `client/index.js`, and add the following lines to
   the `scripts` section of `package.json`:

        "start": "webpack serve --open",
        "build": "webpack --config webpack.config.js --mode production"

    Try `npm run build` and `npm run start` to start the "Hello, World!"
    JavaScript App. It should show up in a browser.

5. Install TypeScript for type-checking only, and Babel packages for the
   actual compilation.

        npm install --save-dev @babel/preset-typescript typescript \
            @types/react @types/react-dom @types/react-router @types/react-router-dom

6. Do the following modifications:

    - Adding `"@babel/preset-typescript"` to tne end of `presets` section
      in `babel.config.json`.
    - Changing `entry: "./client/index.js",` to `entry: "./client/index.tsx",`
      in `webpack.config.js`.
    - Changing `test: /\.jsx?$/,` to `test: /\.(jsx?|tsx?)$/,`
      in `webpack.config.js`.
    - Renaming `App.js` and `index.js` to `App.tsx` and `index.tsx`,
      respectively, and fixing grammar issues by `import React from 'react';`
      in both of them.
    - Addomg `"check": "tsc -b client"` to the end of `scripts` section
      in `package.json`.

   Now run all three scripts to verify the changes works.

7. Adding some code to see if recent EcmaScript features can be compiled and
   executed. (e.g., From ES2017 to ES2020).

8. Install Express and axios

        npm install --save express body-parser axios
        npm install --save-dev @types/express @types/node

   Note that `axios` is for client here but it can be used for server so it
   belongs to dependencies not dev dependencies.
9. Adding some code:

    - `index.js`: The entry for express server, which just calls
      `dist/server/index.js`.
    - `server/index.ts`: the main express server code, which compiles
       into `dist/server/index.js`. It serves on SERVER_PORT (3000 default)
       and do the following routings:
       + `/assets/*` to `assets` directory; do not fall through for missing
        files.
       + `/api/*` to one of the routers in `server/routes`; currently
         only serves `/api/health` which returns a json object `{ok: true}`.
         If there is no route for a particular API, returns 404.
       + Serves all existing files under `dist/client/*` as  `/*`.
       + For missing files, serve `dist/client/index.html`.
    - `server/tsconfig.ts`: the compiler options and directory definition
      of server code compilation.
    - `server/routes/health-router.ts`: serves `/api/health`.
    - `webport.config.js` changes:
       + Compile client code to `dist/client` instead;
       + It runs on envvar CLIENT_PORT (default: 8085);
       + For webport-dev-server: add a proxy for `/api/` to the express
         server port on envvar SERVER_PORT (default: 3000).

   Also, we had Changed `scripts` section as follows:

        "dev-client": "webpack-dev-server --port 8085 --open",
        "build-client": "webpack --config webpack.config.js --mode production",
        "build-server": "tsc -b ./server",
        "start": "node index.js",
        "check": "tsc -b client"

    Now one needs to do `npm run build-server` then run `npm run start` to
    run the server on SERVER_PORT (3000). The server serves all client static
    files if `npm run build-client` had ben run previously.
    Afterwards, it can run webpack-dev-server by `npm run dev-client` which
    will proxy all `/api` to the server. Then connecting the webpack-dev-server
    port CLIENT_PORT (8085). Then client is refreshed after update but the
    server is not.
