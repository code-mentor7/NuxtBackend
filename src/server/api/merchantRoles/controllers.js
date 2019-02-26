import { ServerError } from "express-server-error"

import { generateControllers } from "../../common/query"
import MerchantRoles from "./models"

const getAll = async (req, res, next) => {
  if (!req.user) throw new ServerError("Unauthorized.", { status: 401 })

  const roles = await MerchantRoles.find({
    $or: [
      { merchant_id: req.user.merchant_id },
      { merchant_id: { $exists: false } }
    ],
    name: { $ne: "super-admin-96" }
  }, "name")

  return res.status(200).json(roles)
}

export default generateControllers(MerchantRoles, [], {
  getAll
})
