# rbb-data starter

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Start a new Project:

To create a new project just run:

````bash
git clone git@github.com:rbb-data/starter.git my-rbb-data-project --depth 1
cd my-rbb-data-project
rm -rf .git
git init
git add --all
git commit -m "Init with clone from rbb-data starter"
````
Replace "my-rbb-data-project" with the name of your project.

Propably you also want to add a remote.
For example:
````
git remote add origin https://docs.rbb-online.de/bitbucket/scm/rdat/my-rbb-data-project.git
git push -u origin master
````

Adjust the project name/path in the following files: `.env` and `package.json` (see below). 

## TODO:

- [ ] move map to serach result if it is off screen
- [ ] add example script for data conversion
- [ ] add date picker from christmas market map
- [ ] add play / stop button from e-scooter-map

## Folder structure

Your app lives in `/src`.  
Reusable modules should eventually be moved to `src/shared` and be pushed back to Github. :)

(create react app forces all code to live under `src`)

## Environment Variables

### Bing Keys

We don't want our bing keys in version control so you have to add them as `REACT_APP_BING_KEY`
in an `.env.local` file (or `.env.development.local` for the development key).
You can just copy and rename `.env.local.example` and add the key. :-)

For more about .env files in cra see https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables

### Homepage

By default, Create React App produces a build assuming your app is hosted at the server root.
To override this, specify the homepage in your `package.json`, for example:

    "homepage": "http://rbb24.de/static/rbb/rbb-data/project-name",

### Analytics

This App can track "pageviews" and e.g. map interactions.
To enable this you need to replace everything in `{}` in the ANALYTICS variables in the `.env` file
and set `REACT_APP_ANALYTICS_ENABLED` to true.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run analyze`

Analyze the bundle size you can also run `npm run analyze-without-build` if you already have run
`npm run build` before.

### `npm run storybook`

Creates and opens the [storybook](https://storybook.js.org/) that documents the components in `/shared`

### `npm run deploy-storybook`

Deploy storybook to gh-pages

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run --silent scripts:create-geojson-mask`

Inverts a given geojson file and creates a mask that can be displayed on a map to draw focus on an area (see `src/data/potsdam-mask.geo.json` for an example`. Additional info: `npm run scripts:create-geojson-mask --help`.

**NOTE:** The `--silent` flag is needed, otherwise invalid GeoJSON will be produced.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting


### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
