
export const isInRoles = (publicId, fileType = "image") => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId, { resource_type: fileType },
      (error, result) => {
        if (error) return reject(error)
        return resolve(result)
      })
  })
}
