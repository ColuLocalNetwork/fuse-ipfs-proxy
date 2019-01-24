module.exports = (osseus) => {
  return {
    create: async (req, res, next) => {
      osseus.lib.Metadata.create(req.file.buffer, true)
        .then(md => {
          delete md.data
          res.send(md)
        })
        .catch(err => { next(err) })
    },

    get: async (req, res, next) => {
      osseus.lib.Metadata.get(req.params.hash, true)
        .then(md => {
          res.set('Content-Type', 'image')
          res.send(md.data)
        })
        .catch(err => { next(err) })
    }
  }
}
