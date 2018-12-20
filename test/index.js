const Osseus = require('@colucom/osseus')
const path = require('path')
const cwd = process.cwd()

module.exports = async () => {
  let osseus = await Osseus.get()
  osseus.cwd = osseus.cwd || cwd

  osseus.db_models = osseus.db_models || {
    metadata: require(path.join(cwd, 'modules/db/metadata'))(osseus)
  }

  osseus.lib = osseus.lib || {
    Metadata: require(path.join(cwd, 'modules/lib/metadata'))(osseus)
  }

  osseus.helpers = {
    randomNum: (n) => {
      return Math.floor(Math.random() * n)
    },
    randomNumNotZero: (n) => {
      return Math.floor(Math.random() * n) + 1
    },
    randomStr: (n) => {
      return Math.random().toString(36).substr(2, n)
    },
    clearDB: () => {
      Object.keys(osseus.db_models).forEach(model => {
        osseus.db_models[model].getModel().remove({}, () => {})
      })
    }
  }

  return osseus
}
