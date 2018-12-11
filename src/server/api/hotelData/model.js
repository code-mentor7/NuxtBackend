import mongoose from "mongoose"

const hotelsSchema = new mongoose.Schema({
  hotel_id: {
    type: String,
    label: "Hotel ID"
  },
  chain_id: { type: String },
  chain_name: { type: String },
  brain_id: { type: String },
  brain_name: { type: String },
  hotel_name: { type: String },
  hotel_formerly_name: { type: String },
  hotel_translated_name: { type: String },
  addressline1: { type: String },
  addressline2: { type: String },
  zipcode: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String, index: 1 },
  countryisocode: { type: String },
  star_rating: { type: String },
  longitude: { type: String },
  latitude: { type: String },
  url: { type: String },
  checkin: { type: String },
  checkout: { type: String },
  numberrooms: { type: String },
  numberfloors: { type: String },
  yearopened: { type: String },
  yearrenovated: { type: String },
  photo1: { type: String },
  photo2: { type: String },
  photo3: { type: String },
  photo4: { type: String },
  photo5: { type: String },
  overview: { type: String },
  rates_from: { type: String },
  continent_id: { type: String },
  continent_name: { type: String },
  city_id: { type: String },
  country_id: { type: String },
  number_of_reviews: { type: String },
  rating_average: { type: String },
  rates_currency: { type: String }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

hotelsSchema.index({
  hotel_name: "text",
  hotel_translated_name: "text",
  addressline1: "text",
  addressline2: "text",
  zipcode: "text",
  city: "text",
  state: "text",
  country: "text"
}, { name: "hotelIndexing", background: true })

const Hotels = mongoose.model("Hotel_data", hotelsSchema, "hotel_data")

export default Hotels
