import mongoose from "mongoose"
import TransactionItems from "../transactionItems/models"

const transactionSchema = new mongoose.Schema({
  "payment_method": {
    type: String,
    optional: true
  },
  "customer_id": {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers"
  },
  // "customer_id": { type: String },
  "customer_name": { type: String, optional: true },
  "customer_email": { type: String, optional: true },
  "total_amount": {
    type: Number,
    label: "Total Amount",
    defaultValue: 0
  },
  "roundoff_total_amount": {
    type: Number,
    label: "Round Off Total Amount",
    defaultValue: 0,
    optional: true
  },
  "payment_amount": {
    type: Number,
    label: "payment",
    defaultValue: 0
  },
  "balance": {
    type: Number,
    label: "payment balance",
    defaultValue: 0,
    optional: true
  },
  "rounded_off": {
    type: Number,
    label: "rounded off",
    defaultValue: 0,
    optional: true
  },
  "merchant_ids": [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "merchants"
    }
  ],
  // "merchant_ids": {
  //   type: Array,
  //   defaultValue: [],
  //   optional: true
  // },
  // "merchant_ids.$": {
  //   type: String,
  //   optional: true,
  //   blackbox: true
  // },
  "shipping_address": {
    type: Array,
    defaultValue: [],
    optional: true
  },
  "shipping_address.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  "billing_address": {
    type: Array,
    defaultValue: [],
    optional: true
  },
  "billing_address.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  "is_pending": {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  "is_cancelled": {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  "is_refunded": {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  "is_completed": {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  "is_paid": {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  "notes": {
    type: String,
    optional: true
  },
  "buyer_notes": {
    type: String,
    optional: true
  },
  "system_notes": {
    type: String,
    optional: true
  },
  "pg_trans_id": {
    type: String,
    label: "Payment Gateway Transaction ID",
    optional: true
  },
  "pg_auth_code": {
    type: String,
    label: "Payment Gateway Bank Auth Code",
    optional: true
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
  toJSON: { virtuals: true }
})

transactionSchema.virtual("items", {
  ref: TransactionItems, // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "transaction_id" // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.

})

transactionSchema.pre("findOne", function () {
  this.populate("items")
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

const Transactions = mongoose.model("Transactions", transactionSchema, "transactions")

export default Transactions
