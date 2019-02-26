import mongoose from "mongoose"

const transactionItemSchema = new mongoose.Schema({
  travel_start_date: {
    type: Date,
    optional: true
  },
  travel_end_date: {
    type: Date,
    optional: true
  },
  // TODO: transaction id human readable id
  transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "transactions"
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"
  },
  product_sku: { type: String, optional: true },
  product_name: { type: String, optional: true },
  merchant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "merchants"
  },
  merchant_name: { type: String, optional: true },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers"
  },
  customer_name: { type: String, optional: true },
  customer_email: { type: String, optional: true },
  child_quantity: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  adult_quantity: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  adult_unit_price: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  child_unit_price: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  adult_travel_insurance_unit_price: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  child_travel_insurance_unit_price: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  handling_fee: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  total_price: { type: Number, optional: true },
  total_discounted_amount: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  adult_discounted_amount: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  child_discounted_amount: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  tour_guide_price: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  tour_guide_name: {
    type: String,
    optional: true
  },
  is_tour_guide: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  is_insurance: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  is_pending: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  is_cancelled: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  is_refunded: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  is_completed: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  is_paid: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  system_notes: {
    type: String,
    optional: true
  },
  notes: {
    type: String,
    optional: true
  },
  buyer_notes: {
    type: String,
    optional: true
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const TransactionItems = mongoose.model("TransactionItems", transactionItemSchema, "transaction_items")

export default TransactionItems
