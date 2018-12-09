import { ServerError } from "express-server-error"
import _ from "lodash"

import * as COMMON from "../../common"
import { cloudinaryRemoveSingleFileWithPublicId, cloudinaryUploadSingleFileWithBuffer } from "../../common/cloudinary"
import { generateControllers } from "../../common/query"
import SiteIdentity from "./models"

const updateOneById = async (req, res, next) => {
  if (!req.params.id) throw new ServerError("Id not found.", { status: 400 })

  try {
    let parsedJsonObj = JSON.parse(req.body.jsonObj)
    let allowedSchema = _.pick(parsedJsonObj, COMMON.getSchemaKeys(SiteIdentity))
    if (req.files) {
      await Promise.all(Object.keys(req.files).map(async (key) => {
        if (req.files[key][0].mimetype.indexOf("image") !== -1) {
          const cloudinaryImgObj = await cloudinaryUploadSingleFileWithBuffer(req.files[key][0])
          allowedSchema[key] = cloudinaryImgObj.public_id
        }
      }))
    }
    if (parsedJsonObj.resourcesToBeRemoved) {
      _.each(parsedJsonObj.resourcesToBeRemoved, (resource) => {
        cloudinaryRemoveSingleFileWithPublicId(resource.id)
          .catch()
      })
    }
    const findQuery = { _id: req.params.id }
    const updateQuery = { $set: { ...allowedSchema } }
    await SiteIdentity.updateOne(findQuery, updateQuery)
    res.send("done")
  }
  catch (err) {
    res.handleServerError(err)
  }
}

export default generateControllers(SiteIdentity, [], {
  updateOneById: updateOneById
})
