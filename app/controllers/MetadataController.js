module.exports = (osseus) => {
  return {
    /**
     * @apiDefine MetadataResponse
     * @apiSuccess {String} hash IPFS hash.
     * @apiSuccess {Object} data the data stored on IPFS.

     * @apiSuccessExample Success Example
     *     HTTP/1.1 200 OK
     *     {
     *      "hash": "QmbYfGE9D1nSLo9dT8YUHmqzUc2EzEpXu9V6Wpcy3UcHhV",
     *      "data": {
     *          "num": 4,
     *          "str": "bfdrotizxx",
     *          "array": [6, 8, 1],
     *          "object": {
     *              "num": 6,
     *              "str": "81v4k1w1oz"
     *          }
     *      }
     *     }

     * @apiErrorExample Error Example
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "error": "The error description"
     *     }
     */

    /**
     * @apiDefine JWT
     * @apiHeader {String} Authorization JWT token generated using OSSEUS_ROUTER_JWT_SECRET value from the config.
     * @apiHeaderExample {json} Header-Example:
     *  {
     *      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlZGVmYWNlYi1lYzIxLTRmZmQtOWQ5OS1mMTdiMmNiMDliNTEiLCJpYXQiOjE1NDAxMzEyODIsImV4cCI6MTU0MDEzNDg4Mn0.DrIdRXOPcqH_NSTs8aZ91-hpI2Tj04xgRoYxbpyr5ok"
     *  }
     */

    /**
     * @api {post} /api/metadata/ Create
     * @apiName CreateMetadata
     * @apiGroup Metadata
     * @apiVersion 1.0.0
     *
     * @apiDescription Create new metadata
     *
     * @apiUse JWT
     *
     * @apiParam {Object} data the data to be stored on IPFS.
     *
     * @apiUse MetadataResponse
     */
    create: async (req, res, next) => {
      osseus.lib.Metadata.create(req.body.data)
        .then(md => { res.send(md) })
        .catch(err => { next(err) })
    },

    /**
     * @api {get} /api/metadata/:hash Get by hash
     * @apiName GetMetadataByHash
     * @apiGroup Metadata
     * @apiVersion 1.0.0
     *
     * @apiDescription Get metadata by hash
     *
     * @apiUse JWT
     *
     * @apiParam {String} hash IPFS hash.
     *
     * @apiUse MetadataResponse
     */
    get: async (req, res, next) => {
      osseus.lib.Metadata.get(req.params.hash)
        .then(md => { res.send(md) })
        .catch(err => { next(err) })
    }
  }
}
