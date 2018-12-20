const init = (osseus) => {
  this.osseus = osseus
  return new Promise((resolve, reject) => {
    this.osseus.db_models = {
      metadata: require('./metadata')(this.osseus)
    }
    osseus.logger.info(`DB ready`)
    return resolve()
  })
}

module.exports = {
  init: init
}
