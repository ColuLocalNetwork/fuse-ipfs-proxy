module.exports = (osseus) => {
  const db = osseus.mongo
  const Schema = db.mongoose.Schema

  const MetadataSchema = new Schema({
    hash: {type: String, required: [true, `can't be blank`]},
    data: {type: db.mongoose.Schema.Types.Buffer}
  }, {timestamps: true})

  MetadataSchema.index({hash: 1}, {unique: true})

  MetadataSchema.set('toJSON', {
    getters: true,
    virtuals: true,
    transform: (doc, ret, options) => {
      const safeRet = {
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        hash: doc.hash,
        data: JSON.parse(doc.data.toString())
      }
      return safeRet
    }
  })

  const Metadata = db.model('Metadata', MetadataSchema)

  function metadata () {}

  metadata.create = (md) => {
    return new Promise((resolve, reject) => {
      md.data = Buffer.from(JSON.stringify(md.data))
      const metadata = new Metadata(md)
      metadata.save((err, newObj) => {
        if (err) {
          return reject(err)
        }
        if (!newObj) {
          return reject(new Error(`Metadata not saved`))
        }
        resolve(newObj.toJSON())
      })
    })
  }

  metadata.getByHash = (hash) => {
    return new Promise((resolve, reject) => {
      Metadata.findOne({hash: hash}, (err, doc) => {
        if (err) {
          return reject(err)
        }
        if (!doc) {
          return reject(new Error(`Metadata not found for hash: ${hash}`))
        }
        resolve(doc.toJSON())
      })
    })
  }

  metadata.getModel = () => {
    return Metadata
  }

  return metadata
}
