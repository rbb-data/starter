# rbb-data starter

This project was bootstrapped with the [rbb starter](https://github.com/rbb-data/starter) and [nextjs](https://nextjs.org/).

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

## Environment Variables

### Keys

We don't want our keys in version control so you have to add them as NEXT_PUBLIC_BING_KEY and NEXT_PUBLIC_OPENROUTSERVICE_KEY in an .env.local file (or .env.development.local because bing has a different development key). You can just copy and rename .env.local.example and add the keys. 🙂

### Analytics

This App can track "pageviews" and e.g. map interactions.
To enable this you need to replace everything in `{}` in the ANALYTICS variables in the `.env` file
and set `ANALYTICS_ENABLED` to true.

## Deveolpment and build Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

You can also run `docker-compose up` to run your app inside docker.  
It will also run nextjs in dev mode and mount all files including `node_modules` so you have to run `npm install` again.
You could use the node_modules from docker by mounting a volume under `app/node_modules`.

To build the dockerfile you need to login to the rbb dockerreg first via:

```
docker login dockerreg.rbb-cloud.de
```

### `npm run analyze`

Analyze the bundle size you can also run `npm run analyze-without-build` if you already have run
`npm run build` before.

### `npm run storybook`

Creates and opens the [storybook](https://storybook.js.org/) that documents the components in `/shared`

### `npm run build`

build the app so it can be run on a node server

### `npm run build && npm run export`

build and export the app so it can be put on a static file server

## helper scripts

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
