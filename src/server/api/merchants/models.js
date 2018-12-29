import mongoose from "mongoose"

const merchantsSchema = new mongoose.Schema({
  "name": {
    type: String
    // index: 1
  },
  "image_id": {
    type: String,
    optional: true
  },
  "cover_image_id": {
    type: String,
    optional: true
  },
  "email": {
    type: String
    // index: 1
  },
  "secondary_email": {
    type: String,
    // index: 1,
    optional: true
  },
  "user_id": {
    type: String
    // index: 1,
    // unique: true,
    // sparse: true
  },
  "total_reviews": {
    type: Number,
    // index: -1,
    defaultValue: 0
  },
  "total_ratings": {
    type: Number,
    // index: -1,
    defaultValue: 0
  },
  "contact_number": { type: String, optional: true },
  "user_ids": {
    type: Array,
    defaultValue: [],
    optional: true
  },
  "user_ids.$": {
    type: String,
    optional: true
  },
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
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const Merchants = mongoose.model("Merchants", merchantsSchema, "merchants")

export default Merchants
