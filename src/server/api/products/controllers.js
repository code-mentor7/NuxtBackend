import { ServerError } from "express-server-error"
import _ from "lodash"

import * as COMMON from "../../common"
import { cloudinaryRemoveSingleFileWithPublicId, cloudinaryUploadSingleFile } from "../../common/cloudinary"
import { generateControllers } from "../../common/query"
import Products from "./models"

const updateOneById = async (req, res, next) => {
  if (!req.params.id) throw new ServerError("Id not found.", { status: 400 })

  try {
    let parsedJsonObj = JSON.parse(req.body.jsonObj)
    let allowedSchema = _.pick(parsedJsonObj, COMMON.getSchemaKeys(Products, ["_id", "id", "created_at", "updated_at", "slug"]))

    if (req.files) {
      let promiseArr = []
      // TODO: refactor
      Object.keys(req.files).map(async (filesKey) => {
        req.files[filesKey].map((file) => {
          if (file.mimetype.indexOf("image") !== -1 || file.mimetype.indexOf("pdf") !== -1) {
            promiseArr.push(new Promise(async (resolve) => {
              const cloudinaryImgObj = await cloudinaryUploadSingleFile(file)
              resolve()
              if (Array.isArray(allowedSchema[filesKey])) {
                allowedSchema[filesKey].push({
                  image_id: cloudinaryImgObj.public_id,
                  image_filename: file.originalname
                })
              }
              else {
                allowedSchema[filesKey] = cloudinaryImgObj.public_id
              }

              COMMON.removeFile(file.path) // remove file after upload complete
            }))
          }
        })
      })
      await Promise.all(promiseArr)
    }
    if (parsedJsonObj.resourcesToBeRemoved) {
      _.each(parsedJsonObj.resourcesToBeRemoved, (resource) => {
        cloudinaryRemoveSingleFileWithPublicId(resource.id)
          .catch()
      })
    }

    allowedSchema.other_image_ids = allowedSchema.other_image_ids.filter((value, index) => {
      return !value.isNew
    })
    // TODO: array need push

    console.log("### allowedSchema", allowedSchema)
    const findQuery = { _id: req.params.id }
    const updateQuery = { $set: { ...allowedSchema } }
    await Products.updateOne(findQuery, updateQuery, { new: true })
    res.send("done")
  }
  catch (err) {
    res.handleServerError(err)
  }
}

export default generateControllers(Products,
  COMMON.getSchemaKeys(Products, ["_id", "id", "created_at", "updated_at", "slug"]),
  {
    updateOneById: updateOneById
  }
)
