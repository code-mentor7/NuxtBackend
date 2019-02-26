import { filter } from "lodash"

export const isAllowedAccess = (roles = [], privileges = [], user) => {
  if (!user.roles) return false
  if (roles.length === 0 && privileges.length === 0) return true
  if (user.roles.admin || user.roles["super-admin-96"]) return true
  let allow = false

  for (const role of roles) {
    if (typeof (user.roles[role]) !== "undefined") {
      allow = true
      break
    }
  }

  if (allow === false) {
    for (const priv of privileges) {
      const userRoleKey = Object.keys(user.roles)
      for (const key of userRoleKey) {
        if (user.roles[key].indexOf(priv) !== -1) {
          allow = true
          break
        }
      }
      if (allow === true) break
    }
  }
  return allow
}

export const isAdmin = (roles = []) => {
  return filter(roles, { name: "admin" }).length > 0
}

export const isSuperAdmin = (roles = []) => {
  return filter(roles, { name: "super-admin-96" }).length > 0
}
