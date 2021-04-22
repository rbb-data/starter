const withImages = require('next-images')
module.exports = withImages({
  basePath: process.env.URL_PREFIX,
})
