import bcrypt from "bcryptjs"
import { ServerError } from "express-server-error"
import jwt from "jsonwebtoken"
import { pick as _pick, omit as _omit } from "lodash"

import * as COMMON from "../../common"
import MerchantRoles from "../merchantRoles/models"
import MerchantUsers from "../merchantUsers/models"
import randString from "~/util/randString"
import * as Roles from "../../common/roles"

export const check = {
  async post (req, res) {
    try {
      if (req.body.email) {
        let cust = await MerchantUsers.find({ email: req.body.email })
        if (cust.length === 0) res.json({ exists: false })
        else throw new ServerError("Email exists", { status: 401, log: false })
      }
      else {
        throw new ServerError("Query not supported.", { status: 400 })
      }
    }
    catch (error) {
      res.handleServerError(error)
    }
  }
}

export const changePass = {
  async post (req, res) {
    try {
      const { password, currentPassword } = req.body
      const { email } = req.user
      let user = await MerchantUsers.findOne({ email })
      if (!user) throw new ServerError("User not found.", { status: 401, log: false })
      let passwordHash = user.password
      let matched = await bcrypt.compare(currentPassword, passwordHash)
      if (!user || !matched || !email || !password) {
        throw new ServerError("Change password failed.", { status: 403, log: false })
      }
      else {
        if (user.account_verified !== true) {
          throw new ServerError("Account not verified.", { status: 403, log: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await MerchantUsers.updateOne({ _id: user._id }, { password: hashedPassword })
        res.send("done")
      }
    }
    catch (err) {
      res.handleServerError(err)
    }
  }
}

export const forgotPass = {
  async post (req, res) {
    try {
      const { email } = req.body
      if (!email) {
        throw new ServerError("Email is required.", { status: 400 })
      }
      let cust = await MerchantUsers.findOne({ email })
      if (!cust) throw new ServerError("Email not found.", { status: 400 })

      if (cust.account_verified === false) {
        throw new ServerError("Please verify your account.", { status: 403 })
      }
      if (cust.reset_password_attempt > 2) {
        if (cust.reset_password_token !== "") {
          cust.reset_password_token = ""
          await cust.save()
        }
        throw new ServerError("short and stout", { status: 418 })
      }

      const signature = {
        email: cust.email,
        contact_number: cust.contact_number,
        type: "reset"
      }

      cust.reset_password_token = COMMON.generateToken(signature)
      cust.reset_password_attempt += 1
      cust.reset_password_attempt_at = new Date()

      await cust.save()
      const resetLink = `${req.protocol}://${req.get("host")}/reset-password?i=${cust.reset_password_token}`
      const emailHTML = COMMON.generateEmailHTMLButtonTemplate(
        resetLink,
        "Reset Password",
        "Click the button to reset your password",
        "Click Me"
      )
      await COMMON.sendEmail(cust.email, "[96travel Center] Reset Password", emailHTML)
      res.json({ status: "OK" })
    }
    catch (err) {
      res.handleServerError(err)
    }
  }
}

export const login = {
  async post (req, res) {
    try {
      let { email, password } = req.body
      let user = await MerchantUsers.findOne({ email })
      if (!user) throw new ServerError("Authentication failed.", { status: 401, log: false })
      let passwordHash = user.password
      let matched = await bcrypt.compare(password, passwordHash)
      if (!user || !matched || !email || !password) {
        throw new ServerError("Authentication failed.", { status: 401, log: false })
      }
      else {
        const userObj = _pick(user.toObject(), [
          "name", "_id", "email", "merchant_id", "contact_number", "dark_theme", "localeLang", "account_verified"
        ])
        if (userObj.account_verified !== true) {
          throw new ServerError("Account not verified.", { status: 403, log: false })
        }
        const token = jwt.sign(userObj, process.env.SECRET, { expiresIn: "30 days", jwtid: randString() })
        res.json({ token })
      }
    }
    catch (error) {
      console.log("### err at here", error)
      res.handleServerError(error)
    }
  }
}

export const logout = {
  async post (req, res) {
    req.user = {}
    res.json({ status: "OK" })
  }
}

export const resendVE = {
  async post (req, res) {
    try {
      const { email } = req.body
      if (!email) {
        throw new ServerError("Email is required.", { status: 400 })
      }
      let cust = await MerchantUsers.findOne({ email })
      if (!cust) throw new ServerError("Email not found.", { status: 400 })

      if (cust.account_verified === true) {
        throw new ServerError("Account already verified.", { status: 403 })
      }

      const signature = {
        email: cust.email,
        contact_number: cust.contact_number,
        type: "verify"
      }

      cust.verification_token = COMMON.generateToken(signature)

      await cust.save()
      const verificationLink = `${req.protocol}://${req.get("host")}/verify?i=${cust.verification_token}`
      const emailHTML = COMMON.generateEmailHTMLButtonTemplate(
        verificationLink,
        "Email Verification",
        "Verify your email to complete your signup",
        "Click Me"
      )
      await COMMON.sendEmail(cust.email, "[96travel Center] Verify Your Signup", emailHTML)
      res.json({ status: "OK" })
    }
    catch (err) {
      res.handleServerError(err)
    }
  }
}

export const resetPass = {
  async post (req, res) {
    try {
      if (req.body.password === undefined) {
        throw new ServerError("Password required.", { status: 400 })
      }
      let decodedData = jwt.verify(req.body.i, process.env.SECRET)
      let cust = await MerchantUsers.findOne({ email: decodedData.email })

      if (!cust) throw new ServerError("Email not found.", { status: 400 })
      cust.reset_password_token = ""
      cust.reset_password_attempt = 0
      cust.reset_password_at = new Date()
      cust.password = req.body.password
      cust.save()
      res.json({ status: "OK" })
    }
    catch (err) {
      res.handleServerError(err)
    }
  }
}

export const signup = {
  async post (req, res) {
    try {
      const allowedSchema = _pick(req.body, COMMON.getSchemaKeys(MerchantUsers))
      // TODO: remove hardcoded merchant id
      allowedSchema.merchant_id = "5a886f9a356447c1eccb4344"
      allowedSchema.account_verified = true // TODO: remove this when b2b
      if (!allowedSchema.merchant_id) throw new ServerError("Merchant not found.", { status: 403 })
      let signature = {
        contact_number: allowedSchema.contact_number,
        email: allowedSchema.email,
        merchant_id: allowedSchema.merchant_id,
        type: "verify"
      }

      allowedSchema.verification_token = COMMON.generateToken(signature)
      // unique is an index configuration option in your schema.
      // If your 'users' collection doesn't have a unique index on userName,
      // you need to wait for the index to build before you start relying on it.
      // https://github.com/Automattic/mongoose/issues/5050
      // await Customer.init()
      // TODO: right now meteor relying on user id unique, need to change index to email
      // let newCustomer = new Customer(allowedSchema)
      // await newCustomer.save()
      if (!allowedSchema.roles) {
        const userRole = await MerchantRoles.findOne({ name: "admin" })
        allowedSchema.roles = [userRole._id]
      }
      await MerchantUsers.create(allowedSchema)
      const verificationLink = `${req.protocol}://${req.get("host")}/verify?i=${allowedSchema.verification_token}`
      const emailHTML = COMMON.generateEmailHTMLButtonTemplate(
        verificationLink,
        "Email Verification",
        "Verify your email to complete your signup",
        "Click Me"
      )
      await COMMON.sendEmail(allowedSchema.email, "[96travel Center] Verify Your Signup", emailHTML)
      res.json({ status: "OK" })
    }
    catch (error) {
      console.log("#################ERROR", error.message)
      res.handleServerError(error)
    }
  }
}

export const user = {
  async get (req, res) {
    let freshUser = {}
    let user = await MerchantUsers.findOne({ _id: req.user._id })
    if (user) {
      freshUser = _pick(user.toObject(), [
        "name", "_id", "email", "merchant_id", "contact_number", "dark_theme", "localeLang"
      ])
      if (Roles.isSuperAdmin(user.roles)) freshUser.iamawesome = true
      if (Roles.isAdmin(user.roles)) freshUser.iamadmin = true
    }
    req.user = { ...freshUser }

    res.json({ user: freshUser })
  }
}

export const verify = {
  async post (req, res) {
    try {
      let cust = req.userObj

      if (cust === undefined) {
        throw new ServerError("Email not found.", { status: 400 })
      }

      if (cust.account_verified === true) {
        throw new ServerError("Account already verified.", { status: 403 })
      }
      cust.verified_at = new Date()
      cust.account_verified = true
      cust.verified_via = "email"
      cust.verification_token = ""
      await cust.save()
      delete req.userObj
      res.json({ status: "OK" })
    }
    catch (error) {
      res.handleServerError(error)
    }
  }
}
