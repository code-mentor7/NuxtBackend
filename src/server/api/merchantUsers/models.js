import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { ServerError } from "express-server-error"
import MerchantRoles from "../merchantRoles/models"
import Merchants from "../merchants/models"

// import Products from "../products/models"

// TODO: Customer Roles

const merchantUsersSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  merchant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "merchants"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  secondary_email: {
    type: String
  },
  image_id: {
    type: String
  },
  contact_number: {
    type: String
  },
  localeLang: {
    type: String,
    default: "en"
  },
  password: {
    type: String,
    require: true,
    minlength: 5
  },
  account_verified: {
    type: Boolean,
    default: false
  },
  dark_theme: {
    type: Boolean,
    default: false
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "merchant_roles"
    }
  ],
  reset_password_attempt: {
    type: Number,
    default: 0
  },
  reset_password_attempt_at: {
    type: Date
  },
  reset_password_at: {
    type: Date
  },
  reset_password_token: {
    type: String
  },
  verification_token: {
    type: String
  },
  verified_at: {
    type: Date
  },
  verified_via: {
    type: String
  }
}, {
  strict: true,
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

merchantUsersSchema.pre("findOne", function () {
  this.populate({
    path: "merchant_id",
    model: Merchants,
    select: "name _id"
  })
  this.populate({
    path: "roles",
    model: MerchantRoles,
    select: "name _id privileges"
  })
})

merchantUsersSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

merchantUsersSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new ServerError("Email already registered.", { status: 409, log: false }))
  }
})

// don't ever return password on creation.
merchantUsersSchema.set("toJSON", {
  transform (doc, ret, options) {
    delete ret.password
    delete ret.exp
    delete ret.iat
    delete ret.jti
    delete ret.__v
    return ret
  }
})

const MerchantUsers = mongoose.model("MerchantUsers", merchantUsersSchema, "merchant_users")
export default MerchantUsers
