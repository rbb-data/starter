module.exports = {
  basePath: process.env.URL_PREFIX,
  eslint: {
    // production build completes even if linting errors exist
    ignoreDuringBuilds: true,
  }
}
