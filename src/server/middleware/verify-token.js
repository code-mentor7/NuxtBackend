import Customer from "../api/merchantUsers/models"
import jwt from "jsonwebtoken"
import moment from "moment"
import { ServerError } from "express-server-error"
const TYPE_OF_TOKEN = {
  verify: "verification_token",
  reset: "reset_password_token"
}

const verifyToken = async (req, res, next) => {
  try {
    let decodedData = jwt.verify(req.body.i, process.env.SECRET)
    let typeOfTokenToCompare = TYPE_OF_TOKEN[decodedData.type] || undefined
    let unixNow = moment().unix()

    if (decodedData.email === undefined) {
      throw new ServerError("Email not found.", { status: 400 })
    }

    if (decodedData.exp) {
      if (unixNow > decodedData.exp) {
        throw new ServerError("Token Expired.", { status: 401 })
      }
    }

    let cust = await Customer.findOne({ email: decodedData.email })

    if (!cust) throw new ServerError("Email not found.", { status: 400 })

    if (cust[typeOfTokenToCompare] !== req.body.i) {
      throw new ServerError("Invalid token.", { status: 401 })
    }

    if (decodedData.type === "verify") {
      req.userObj = cust
      next()
    }
    else {
      res.end()
    }
  }
  catch (error) {
    res.handleServerError(error)
  }
}

export default verifyToken
