module.exports = {
  basePath: process.env.URL_PREFIX,
  eslint: {
    // prevents ESLint errors to fail the production build
    ignoreDuringBuilds: true,
  }
}
