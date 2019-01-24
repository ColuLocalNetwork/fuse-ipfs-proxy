const multer = require('multer')()

module.exports = (osseus) => {
  return {
    upload: (req, res, next) => {
      multer.single('file')(req, res, next)
    }
  }
}
