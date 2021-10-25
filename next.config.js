module.exports = {
  basePath: process.env.BASE_PATH,
  eslint: {
    // production build completes even if linting errors exist
    ignoreDuringBuilds: true,
  }
}
