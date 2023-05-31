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
            @types/react @types/react-dom
