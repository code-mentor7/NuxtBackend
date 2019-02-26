
import { isAllowedAccess } from "../common/roles"

export const hasAccess = (roles, privileges = []) => {
  return (req, res, next) => {
    if (isAllowedAccess(roles, privileges, req.user)) return next()
    return res.status(401).send({
      message: "Access Denied."
    })
  }
}
