import cloudinary from "cloudinary"

export const cloudinaryRemoveSingleFileWithPublicId = (publicId, fileType = "image") => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId, { resource_type: fileType },
      (error, result) => {
        if (error) return reject(error)
        return resolve(result)
      })
  })
}

export const cloudinaryUploadSingleFileWithBuffer = (file) => {
  if (file.constructor !== Object) throw new Error("File must be Object type")
  if (file.buffer.constructor !== Buffer) throw new Error("File Buffer is required")
  // https://github.com/expressjs/multer/issues/398
  return new Promise((resolve, reject) => {
    try {
      cloudinary.v2.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) return reject(error)
          return resolve(result)
        })
        .end(file.buffer)
    }
    catch (error) {
      reject(error)
    }
  })
}
