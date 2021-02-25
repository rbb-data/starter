# rbb-data starter

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Start a new Project:

To create a new project just run:

```bash
git clone git@github.com:rbb-data/starter.git my-rbb-data-project --depth 1
cd my-rbb-data-project
rm -rf .git
git init
git add --all
git commit -m "Init with clone from rbb-data starter"
```

Replace "my-rbb-data-project" with the name of your project.

Propably you also want to add a remote.
For example:

```
git remote add origin https://docs.rbb-online.de/bitbucket/scm/rdat/my-rbb-data-project.git
git push -u origin master
```

Adjust the project name/path in the following files: `.env` and `package.json` (see below).

## Folder structure

Your app lives in `/src`.  
Reusable modules should eventually be moved to `src/shared` and be pushed back to Github. :)

(create react app forces all code to live under `src`)

## Environment Variables

### Keys

We don't want our keys in version control so you have to add them as `NEXT_PUBLIC_BING_KEY`
and `NEXT_PUBLIC_OPENROUTSERVICE_KEY`
in an `.env.local` file (or `.env.development.local` because bing has a different development key).
You can just copy and rename `.env.local.example` and add the keys. :-)

For more about .env files in cra see https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables

### Homepage

By default, Create React App produces a build assuming your app is hosted at the server root.
To override this, specify the homepage in your `package.json`, for example:

    "homepage": "http://rbb24.de/static/rbb/rbb-data/project-name",

### Analytics

This App can track "pageviews" and e.g. map interactions.
To enable this you need to replace everything in `{}` in the ANALYTICS variables in the `.env` file
and set `ANALYTICS_ENABLED` to true.

## Scripts

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

https://create-react-app.dev/docs/available-scripts/#npm-run-eject

### `npm run --silent scripts:create-geojson-mask`

Inverts a given geojson file and creates a mask that can be displayed on a map to draw focus on an area (see `src/data/potsdam-mask.geo.json` for an example`. Additional info:`npm run scripts:create-geojson-mask --help`.

**NOTE:** The `--silent` flag is needed, otherwise invalid GeoJSON will be produced.

### `npm run scripts:geocode-data`

**This is an example script that you need to customize for your project**

This script expects a csv at `../src/data/raw_source_file.csv`. runs through all its
entries and tries to find a geocode specified in the column `Ort` and adds the columns lat lng to each row.
Then it saves the result in the file `../src/data/geocoded.csv`

### `npm run scripts:convert-to-csv`

**This is an example script that you need to customize for your project**

This script expects a csv at `../src/data/geocoded.csv` (you could change this to `../src/data/raw_source_file.cs`)
This is just a simple example on how to map an external file to the datastructure used in the project.
The output is a csv file.
Then it saves the result in the file `../public/markers.csv`

### `npm run scripts:convert-to-geojson`

**This is an example script that you need to customize for your project**

This script expects a csv at `../src/data/geocoded.csv` (you could change this to `../src/data/raw_source_file.cs`)
This is just a simple example on how to map an external file to the datastructure used in the project.
The output is a geojson file.
Then it saves the result in the file `../public/markers.geojson`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
