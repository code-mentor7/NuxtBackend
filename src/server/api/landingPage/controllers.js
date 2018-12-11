import { ServerError } from "express-server-error"
import _ from "lodash"

import * as COMMON from "../../common"
import { cloudinaryRemoveSingleFileWithPublicId, cloudinaryUploadSingleFileWithBuffer } from "../../common/cloudinary"
import { generateControllers } from "../../common/query"
import LandingPage from "./models"

const updateOneById = async (req, res, next) => {
  if (!req.params.id) throw new ServerError("Id not found.", { status: 400 })

  try {
    let parsedJsonObj = JSON.parse(req.body.jsonObj)
    let allowedSchema = _.pick(parsedJsonObj, COMMON.getSchemaKeys(LandingPage))

    if (req.files) {
      await Promise.all(Object.keys(req.files).map(async (key) => {
        if (req.files[key][0].mimetype.indexOf("image") !== -1) {
          const cloudinaryImgObj = await cloudinaryUploadSingleFileWithBuffer(req.files[key][0])
          let fieldNameArr = key.split("#") // ["main_carousel", "0"]
          const objName = fieldNameArr[0]
          const objIndex = fieldNameArr[1]
          allowedSchema[objName][objIndex].media_id = cloudinaryImgObj.public_id
          allowedSchema[objName][objIndex].media_type = "image"

          COMMON.removeFile(req.files[key][0].path) // remove file after upload complete
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
    await LandingPage.updateOne(findQuery, updateQuery)
    res.send("done")
  }
  catch (err) {
    res.handleServerError(err)
  }
}

export default generateControllers(LandingPage, [], {
  updateOneById: updateOneById
})
