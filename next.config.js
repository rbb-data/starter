module.exports = {
  basePath: process.env.URL_PREFIX,
  // required for source-map-explorer to work (makes build slower though!)
  productionBrowserSourceMaps: true,
  eslint: {
    // prevents ESLint errors to fail the production build
    ignoreDuringBuilds: true,
  }
}
