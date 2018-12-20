const init = (osseus) => {
  this.osseus = osseus
  return new Promise((resolve, reject) => {
    this.osseus.lib = {
      Metadata: require('./metadata')(this.osseus)
    }
    osseus.logger.info(`Lib ready`)
    return resolve()
  })
}

module.exports = {
  init: init
}
