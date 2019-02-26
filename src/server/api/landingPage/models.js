import mongoose from "mongoose"

const landingPageSchema = new mongoose.Schema({
  "_id": String,
  "main_carousel": {
    type: Array,
    optional: true,
    label: "Main Carousel",
    defaultValue: []
  },
  "main_carousel.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  "section_title_1": { type: String, optional: true },
  "section_sub_title_1": { type: String, optional: true },
  "section_sub_title_2": { type: String, optional: true },
  "hotel_destination_1": {
    type: Array,
    optional: true,
    label: "hotel destination 1",
    defaultValue: []
  },
  "hotel_destination_1.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  "hotel_destination_2": {
    type: Array,
    optional: true,
    label: "hotel destination 2",
    defaultValue: []
  },
  "hotel_destination_2.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  "section_text_1_disabled": {
    type: Boolean,
    optional: true,
    label: "Disabled",
    defaultValue: false
  },
  "section_text_1_title": { type: String, optional: true },
  "section_text_1_content": { type: String, optional: true },
  "section_text_2_disabled": {
    type: Boolean,
    optional: true,
    label: "Disabled",
    defaultValue: false
  },
  "section_text_2_title": { type: String, optional: true },
  "section_text_2_content": { type: String, optional: true },
  "updated_by": {
    type: String,
    optional: true
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const LandingPage = mongoose.model("LandingPage", landingPageSchema, "landing_page")

landingPageSchema.pre("save", function (next) {
  this._id = this._id.toString()
  next()
})

export default LandingPage
