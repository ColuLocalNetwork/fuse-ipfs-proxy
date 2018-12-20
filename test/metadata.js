const OsseusHelper = require('./index')
const expect = require('chai').expect
const chai = require('chai')
const chaiHttp = require('chai-http')

let osseus

before(async function () {
  osseus = await OsseusHelper()
})

const generateData = () => {
  return {
    num: osseus.helpers.randomNum(10),
    str: osseus.helpers.randomStr(10),
    array: [
      osseus.helpers.randomNum(10),
      osseus.helpers.randomNum(10),
      osseus.helpers.randomNum(10)
    ],
    object: {
      num: osseus.helpers.randomNum(10),
      str: osseus.helpers.randomStr(10)
    }
  }
}

const validateMetadata = (md1, md2, dataObj) => {
  expect(md1).to.be.a('Object')
  expect(md1.hash).to.be.a('string')
  if (md2) expect(md1.hash).to.equal(md2.hash)
  expect(md1.data).to.be.a('Object')
  expect(md1.data).to.deep.equal(md2 ? md2.data : dataObj)
}

describe('Metadata (DB)', function () {
  it('should create metadata', async function () {
    let dataObj = generateData()
    let metadata = await osseus.db_models.metadata.create({hash: osseus.helpers.randomStr(), data: dataObj})
    validateMetadata(metadata, null, dataObj)
  })

  it('should not be able to create metadata with same hash', async function () {
    let hash = osseus.helpers.randomStr()
    let dataObj = generateData()
    await osseus.db_models.metadata.create({hash: hash, data: dataObj})
    let metadata = await osseus.db_models.metadata.create({hash: hash, data: dataObj}).catch(err => {
      expect(err).not.to.be.undefined
    })
    expect(metadata).to.be.undefined
  })

  it('should by able to get metadata by hash', async function () {
    let dataObj = generateData()
    let metadata1 = await osseus.db_models.metadata.create({hash: osseus.helpers.randomStr(), data: dataObj})
    let metadata2 = await osseus.db_models.metadata.getByHash(metadata1.hash)
    validateMetadata(metadata1, metadata2)
  })

  it('should not be able to get metadata of non-existing hash', async function () {
    let metadata = await osseus.db_models.metadata.getByHash(osseus.helpers.randomStr()).catch(err => {
      expect(err).not.to.be.undefined
    })
    expect(metadata).to.be.undefined
  })
})

describe('Metadata (LIB)', function () {
  it('should create metadata', async function () {
    let dataObj = generateData()
    let metadata = await osseus.lib.Metadata.create(dataObj)
    validateMetadata(metadata, null, dataObj)
  })

  it('should be able to get metadata', async function () {
    let dataObj = generateData()
    let metadata1 = await osseus.lib.Metadata.create(dataObj)
    let metadata2 = await osseus.lib.Metadata.get(metadata1.hash)
    validateMetadata(metadata1, metadata2)
  })

  it('should not be able to get metadata of non-existing hash', async function () {
    let metadata = await osseus.lib.Metadata.get(osseus.helpers.randomStr()).catch(err => {
      expect(err).not.to.be.undefined
    })
    expect(metadata).to.be.undefined
  })
})

chai.use(chaiHttp)
describe('Metadata (API)', function () {
  it('should be able to check is_running', function (done) {
    chai.request(osseus.server.app)
      .get(`/is_running`)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('should be able to create metadata', function (done) {
    let dataObj = generateData()
    chai.request(osseus.server.app)
      .post(`${osseus.config.osseus_router.url_prefix}/metadata`)
      .send({data: dataObj})
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.equal(200)
        expect(res.body).to.be.a('Object')
        expect(res.body.hash).to.be.a('String')
        expect(res.body.data).deep.equal(dataObj)
        done()
      })
  })

  it('should be able to get metadata', function (done) {
    let dataObj = generateData()
    osseus.lib.Metadata.create(dataObj).then(metadata => {
      chai.request(osseus.server.app)
        .get(`${osseus.config.osseus_router.url_prefix}/metadata/${metadata.hash}`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.status).to.equal(200)
          expect(res.body).to.be.a('Object')
          expect(res.body.hash).to.be.a('String')
          validateMetadata(metadata, res.body)
          done()
        })
    })
  })

  it('should not be able to get metadata of non-existing hash', function (done) {
    chai.request(osseus.server.app)
      .get(`${osseus.config.osseus_router.url_prefix}/metadata/${osseus.helpers.randomStr()}`)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.equal(500)
        done()
      })
  })
})

after(async function () {
  osseus.helpers.clearDB()
})
