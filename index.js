const Osseus = require('@colucom/osseus')
const cwd = process.cwd()

const main = async () => {
  try {
    const osseus = await Osseus.init()
    osseus.cwd = cwd

    if (osseus.config.debug) console.time('IPFS PROXY')

    await require('./modules/db').init(osseus)
    await require('./modules/lib').init(osseus)
    await require('./modules/errors').init(osseus)

    if (osseus.config.debug) console.timeEnd('IPFS PROXY')

    osseus.logger.info('IPFS PROXY IS RUNNING :)')
  } catch (err) {
    console.error('BOOTSTRAP ERROR!', err.stack || err)
    process.exit(1)
  }
}

main()
