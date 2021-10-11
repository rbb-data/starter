# rbb-data starter

This project was bootstrapped with the [rbb starter](https://github.com/rbb-data/starter) and [nextjs](https://nextjs.org/).

## Start a new Project:

To create a new project, pick a `cool-project-name` and run:

```bash
git clone git@github.com:rbb-data/starter.git cool-project-name --depth 1
cd cool-project-name
npm install
```

Note that `cool-project-name` will be used in various places and will by default also determine the path on the server where the app will be available.

Propably you also want to add a remote.
For example:

```
git remote add origin https://docs.rbb-online.de/bitbucket/scm/rdat/cool-project-name.git
git push -u origin main
```

## Folder structure

Your app lives in `/src`.  
Reusable modules should eventually be moved to `src/components/_shared` and be pushed back to Github. :)

## Environment Variables

### Keys

We don't want our keys in version control so you have to add them as NEXT_PUBLIC_BING_KEY and NEXT_PUBLIC_OPENROUTSERVICE_KEY in an .env.local file (or .env.development.local because bing has a different development key). You can just copy and rename .env.local.example and add the keys. 🙂

### Analytics

This App can track "pageviews" and e.g. map interactions.
To enable this you need to replace everything in `{}` in the ANALYTICS variables in the `.env` file
and set `ANALYTICS_ENABLED` to true.

## Embed as iFrame

`iframe-embed.html` contains code to embed your app into another page. It supports [David J. Bradshaw's iFrame Resizer script](https://github.com/davidjbradshaw/iframe-resizer) by default.

Note that the iFrame should be given an appropriate title.

## Deveolpment and build Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run analyze`

Analyze the bundle size you can also run `npm run analyze-without-build` if you already have run
`npm run build` before.

### `npm run storybook`

Creates and opens the [storybook](https://storybook.js.org/) that documents the components in `/shared`

### `npm run build`

Builds the app so it can be run on a node server

### `npm run build && npm run export`

Builds and exports the app so it can be put on a static file server

### `npm run deploy`

Runs `build` and `export` and uploads the files to `dj1.app.rbb-cloud.de`.
Make sure to have configured the correct project-path in the `scripts` section in `package.json`.

The deployed file will be available at https://dj1.app.rbb-cloud.de/{project-name}.
Be aware that the script overwrites all contents in the target folder, so make sure to choose a unique project name.
In case you overwrote something by accident, don't panic: There are frequent backups and the wiki contains information how to restore these files.

**Note:** You need a certificate to access the server. If you don't have one yet your colleagues will gladly help you out.

**Note:** The script uses [rsync](https://rsync.samba.org/) to efficiently synchronize changed between in your local build and the target folder. The version of `rsync` that ships with macOS is out of date, so please install a recent version via [homebrew](https://brew.sh/) or [nix](https://nixos.org/guides/install-nix.html).
