import cloudinary from "cloudinary"
import { getType } from "../common"

export const cloudinaryRemoveSingleFileWithPublicId = (publicId, fileType = "image") => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId, { resource_type: fileType },
      (error, result) => {
        if (error) return reject(error)
        return resolve(result)
      })
  })
}

export const cloudinaryUploadSingleFile = (file) => {
  // if (file.constructor !== Object) throw new Error("File must be Object type")
  if (getType(file) !== "Object") throw new Error("File must be Object type")
  // https://github.com/expressjs/multer/issues/398
  return new Promise((resolve, reject) => {
    try {
      cloudinary.v2.uploader
        .upload(file.path, (error, result) => {
          if (error) return reject(error)
          return resolve(result)
        })
    }
    catch (error) {
      reject(error)
    }
  })
}
