import moment from "moment"
import Vue from "vue"

const filters = {
  formatDate (val) {
    return moment(val).format("YYYY-MM-DD hh:mm")
  },
  formatDateOnly (val) {
    return moment(val).format("YYYY-MM-DD")
  }
}

// loads all filters
Object.entries(filters).forEach(([key, value]) => {
  Vue.filter(key, value)
})
