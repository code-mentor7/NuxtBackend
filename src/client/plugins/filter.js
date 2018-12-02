import moment from "moment"
import Vue from "vue"

const USDtoMYRRate = 4.1

const filters = {
  convertToMYRFromUSD (price) {
    if (isNaN(price)) {
      return "N/A"
    }
    return (Number(price) * USDtoMYRRate).toFixed(2)
  },
  cloudinaryImageUrl (value) {
    let url = ""
    if (value) {
      url = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/${value}`
    }
    return url
  },
  cloudinaryFaceGravityImageUrl (value) {
    //  http://res.cloudinary.com/travel96/image/upload/c_fill,g_faces,h_250,w_250/xqg4aafdh1uewtwt4dzz
    let url = ""
    if (value) {
      url = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/c_fill,g_faces,h_250,w_250/${value}`
    }
    return url
  },
  cloudinaryRawUrl (value) {
    let url = ""
    if (value) {
      url = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/raw/upload/${value}`
    }
    return url
  },
  determineImgSrc (imgSrc) {
    if (imgSrc) {
      return imgSrc
    }
    return require("~/assets/img/404.png")
  },
  formatDate (val) {
    return moment(val).format("YYYY-MM-DD hh:mm")
  },
  formatDateOnly (val) {
    return moment(val).format("YYYY-MM-DD")
  },
  removeLeadingAndTrailingDoubleQuote (text) {
    // https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string/19156525#19156525\
    let localText = text
    if (text && (typeof text === "string")) {
      localText = text.replace(/^"(.*)"$/, "$1")
    }

    return localText
  },
  truncateTextDisplay (text) {
    if (text) {
      let truncated = text.substring(0, 2000)
      if (text.length > 2000) {
        truncated += " ..."
      }
      return truncated
    }
    return ""
  }
}

// loads all filters
Object.entries(filters).forEach(([key, value]) => {
  Vue.filter(key, value)
})
