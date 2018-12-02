import { urlencoded, json } from "body-parser"
import cloudinary from "cloudinary"
import cookieParser from "cookie-parser"

const setGlobalMiddleware = (app) => {
  app.use(urlencoded({ extended: false }))
  app.use(json())
  app.use(cookieParser())
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })
}

export default setGlobalMiddleware
