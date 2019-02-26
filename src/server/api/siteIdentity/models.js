import mongoose from "mongoose"

const siteIdentitySchema = new mongoose.Schema({
  "_id": String,
  "company_name": { type: String },
  "address_line_1": { type: String },
  "address_line_2": { type: String, optional: true },
  "state": { type: String },
  "city": { type: String },
  "zip_code": { type: String },
  "country": { type: String },
  "phone_number": {
    type: Array,
    default: []
  },
  "phone_number.$": {
    type: Object,
    blackbox: true
  },
  "emails": {
    type: Array,
    label: "Main Carousel",
    default: []
  },
  "emails.$": {
    type: Object,
    blackbox: true
  },
  "whatsapp": {
    type: Array,
    label: "Main Carousel",
    default: []
  },
  "whatsapp.$": {
    type: Object,
    blackbox: true
  },
  "wechat": {
    type: Array,
    label: "Main Carousel",
    default: []
  },
  "wechat.$": {
    type: Object,
    blackbox: true
  },
  "support_emails": {
    type: Array,
    label: "Main Carousel",
    default: []
  },
  "support_emails.$": {
    type: Object,
    blackbox: true
  },
  "fb_url": {
    type: String
  },
  "footer_logo_id": {
    type: String
  },
  "nav_logo_id": {
    type: String
  },
  "partner_logo": {
    type: Object,
    blackbox: true
  },
  "updated_by": {
    type: String
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const SiteIdentity = mongoose.model("SiteIdentity", siteIdentitySchema, "site_identity")

export default SiteIdentity
