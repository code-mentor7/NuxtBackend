import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { ServerError } from "express-server-error"
// import Merchants from "../merchants/models"
// import Products from "../products/models"

// TODO: Customer Roles

const customerSchema = new mongoose.Schema({
  "name": {
    type: String,
    require: true
  },
  "merchant_id": {
    type: String
  },
  "email": {
    type: String,
    required: true,
    unique: true
  },
  "secondary_email": {
    type: String
  },
  "image_id": {
    type: String
  },
  "contact_number": {
    type: String
  },
  "wishlist": {
    type: Array,
    default: []
  },
  "wishlist.$": {
    type: Object,
    blackbox: true
  },
  "cart": [{
    adult_discounted_amount: {
      type: Number,
      default: 0
    },
    adult_quantity: {
      type: Number,
      default: 0
    },
    adult_total_price: {
      type: Number,
      default: 0
    },
    adult_unit_price: {
      type: Number,
      default: 0
    },
    child_discounted_amount: {
      type: Number,
      default: 0
    },
    child_quantity: {
      type: Number,
      default: 0
    },
    child_total_price: {
      type: Number,
      default: 0
    },
    child_unit_price: {
      type: Number,
      default: 0
    },
    is_insurance: {
      type: Boolean,
      default: false
    },
    is_tour_guide: {
      type: Boolean,
      default: false
    },
    merchant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "merchants"
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products"
    },
    total_price: {
      type: Number,
      default: 0
    },
    tour_guide_index: {
      type: Number,
      default: 0
    },
    tour_guide_name: {
      type: String
    },
    tour_guide_price: {
      type: Number,
      default: 0
    },
    travel_end_date: {
      type: Date
    },
    travel_start_date: {
      type: Date
    }
  }],
  // "cart.$": {
  //   type: Object,
  //   blackbox: true,
  //   default: {}
  // },
  "billing_address": {
    type: Array,
    default: []
  },
  "billing_address.$": {
    type: Object,
    blackbox: true
  },
  "shipping_address": {
    type: Array,
    default: []
  },
  "shipping_address.$": {
    type: Object,
    blackbox: true
  },
  "localeLang": {
    type: String,
    default: "en"
  },
  "wechat_id": {
    type: String,
    default: ""
  },
  "password": {
    type: String,
    require: true,
    minlength: 5
  },
  "account_verified": {
    type: Boolean,
    default: false
  },
  "reset_password_attempt": {
    type: Number,
    default: 0
  },
  "reset_password_attempt_at": {
    type: Date
  },
  "reset_password_at": {
    type: Date
  },
  "reset_password_token": {
    type: String
  },
  "verification_token": {
    type: String
  },
  "verified_at": {
    type: Date
  },
  "verified_via": {
    type: String
  }
}, {
  strict: true,
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

customerSchema.pre("findOne", function () {
  // this.populate({
  //   path: "cart.merchant_id",
  //   model: Merchants,
  //   select: "name _id"
  // })
  // this.populate({
  //   path: "cart.product_id",
  //   model: Products,
  //   select: "adult_selling_price adult_promotion_price kid_selling_price kid_promotion_price name slug primary_image_id merchant_id sku adult_travel_insurance_fee child_travel_insurance_fee handling_fee adult_purchase_discount child_purchase_discount _id" })
})

customerSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

customerSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new ServerError("Email already registered.", { status: 409, log: false }))
  }
})

// don't ever return password on creation.
customerSchema.set("toJSON", {
  transform (doc, ret, options) {
    delete ret.password
    delete ret.exp
    delete ret.iat
    delete ret.jti
    delete ret.__v
    return ret
  }
})

const Customer = mongoose.model("Customers", customerSchema)
export default Customer
