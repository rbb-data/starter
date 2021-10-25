# rbb-data starter

This project was bootstrapped with the [rbb starter](https://github.com/rbb-data/starter) and [nextjs](https://nextjs.org/).

## Start a new project:

To create a new project, either use GitHub's "Use this template" button above ↑ or pick a `cool-project-name` and run:

```bash
git clone git@github.com:rbb-data/starter.git cool-project-name --depth 1
cd cool-project-name
npm install
```

Note that `cool-project-name` will be used in various places and will by default also determine the path on the server where the app will be available.

Probably you also want to add a remote.
For example:

```
git remote add origin https://docs.rbb-online.de/bitbucket/scm/rdat/cool-project-name.git
git push -u origin main
```

## Folder structure

Your app lives in `/src`.  
Reusable modules should eventually be moved to `src/components/_shared` and be pushed back to Github. :)

## Environment variables

### Keys

We don't want our keys in version control so you have to add them as NEXT_PUBLIC_BING_KEY and NEXT_PUBLIC_OPENROUTSERVICE_KEY in an .env.local file (or .env.development.local because bing has a different development key). You can just copy and rename .env.local.example and add the keys. 🙂

### Analytics

This app can track "page views" and e.g. map interactions.
To enable this you need to replace everything in `{}` in the ANALYTICS variables in the `.env` file
and set `ANALYTICS_ENABLED` to true.

## Connect to Google doc

You can connect this app to a Google doc. `src/pages/graphic.tsx` exemplifies how:

```js
const GOOGLE_DOC_ID = '1wCovwTGxPsPM-ED-D7hCaL5sMUFBy1A8OadVUCDtQ3A';
const doc = await loadGoogleDoc(GOOGLE_DOC_ID);
const config = parseArchieML(doc);
```

The document id (`GOOGLE_DOC_ID`) can be copy-pasted from the doc's URL. The doc specified in the code above, for example, lives at https://docs.google.com/document/d/1wCovwTGxPsPM-ED-D7hCaL5sMUFBy1A8OadVUCDtQ3A/.

This app has access to the specified doc because _connect@rbb-datenteam.iam.gserviceaccount.com_ has been granted read access; the associated credentials are stored in `google-credentials.json`. Credentials are not stored in version control. If you don't have them, let one of your colleagues know :)

By default any formatting is ignored when loading the document. If you wish to preserve some formatting, use `loadGoogleDoc(GOOGLE_DOC_ID, true)` to load content. Supported styles are: bold, italic, underline, superscript, subscript. As well as links. Anything else is stripped ("sanitized") for security reasons.

The document's content is parsed using [ArchieML](http://archieml.org), a simple markup language designed at the New York Times.

## Embed as iFrame

`iframe-embed.html` contains code to embed your app into another page. It supports [David J. Bradshaw's iFrame Resizer script](https://github.com/davidjbradshaw/iframe-resizer) by default.

Note that the iFrame should be given an appropriate title.

## Development and build scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app so it can be run on a node server

### `npm run build && npm run export`

Builds and exports the app so it can be put on a static file server

If you build your app for deployment on the rbb's static server, make sure to set the environment variable `URL_PREFIX` appropriately (see `.env`).

### `npm run deploy`

Runs `build` and `export` and uploads the files to `dj1.app.rbb-cloud.de`.
Make sure to have configured the correct project-path in the `scripts` section in `package.json`.

The deployed file will be available at https://dj1.app.rbb-cloud.de/{project-name}.
Be aware that the script overwrites all contents in the target folder, so make sure to choose a unique project name.
In case you overwrote something by accident, don't panic: There are frequent backups and the wiki contains information how to restore these files.

**Note:** You need a certificate to access the server. If you don't have one yet your colleagues will gladly help you out.

**Note:** The script uses [rsync](https://rsync.samba.org/) to efficiently synchronize changed between in your local build and the target folder. The version of `rsync` that ships with macOS is out of date, so please install a recent version via [homebrew](https://brew.sh/) or [nix](https://nixos.org/guides/install-nix.html).

### `npm run storybook`

Creates and opens the [storybook](https://storybook.js.org/) that documents the components in `/shared`.

### `npm run storybook:build`

Builds the [storybook](https://storybook.js.org/) that documents the components in `/shared`. Building the storybook fails if ESLint errors exist.

### `npm run lint`

Runs code formatting tools including [ESLint](https://eslint.org) [(configured for next.js)](https://nextjs.org/docs/basic-features/eslint), [stylelint](https://stylelint.io) and [prettier](https://prettier.io).
