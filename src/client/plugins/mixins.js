import Vue from "vue"
import _ from "lodash"

const mixins = {
  methods: {
    addLeadingZero (num) {
      return (num < 10 ? `0${num}` : num)
    },
    capitalize (value) {
      if (!value) return ""
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    checkError (fieldName, validationProps, vuelidateObj, displayName) {
      const errors = []
      if (typeof vuelidateObj === "undefined" || typeof fieldName === "undefined") return errors
      if (typeof vuelidateObj[fieldName] === "undefined") return errors
      if (!vuelidateObj[fieldName].$dirty) return errors
      if (typeof displayName === "undefined") {
        displayName = fieldName
      }
      const errMessages = {
        checked: `${this.capitalize(displayName)} is required`,
        required: `${this.capitalize(displayName)} is required`,
        sameAsPassword: `${this.capitalize(displayName)} does not match.`,
        // regex: `${this.validationLabel} ${this.regexErrorMsg ? this.regexErrorMsg: ''}`,
        maxLength: `${this.capitalize(displayName)} must have at most ${vuelidateObj[fieldName].$params.maxLength ? vuelidateObj[fieldName].$params.maxLength.max : ""} characters`,
        minLength: `${this.capitalize(displayName)} must have at least ${vuelidateObj[fieldName].$params.minLength ? vuelidateObj[fieldName].$params.minLength.min : ""} characters`,
        minValue: `${this.capitalize(displayName)} must be at least ${vuelidateObj[fieldName].$params.minValue ? vuelidateObj[fieldName].$params.minValue.min : ""}`,
        maxValue: `${this.capitalize(displayName)} must be at most ${vuelidateObj[fieldName].$params.maxValue ? vuelidateObj[fieldName].$params.maxValue.max : ""}`,
        email: `${this.capitalize(displayName)} is invalid`,
        uniqueEmail: `Email already exist`
      }

      _.each(validationProps[fieldName], (value, key) => {
        if (!vuelidateObj[fieldName][key]) {
          if (typeof value !== "function") {
            errors.push(value)
          }
          else {
            errors.push(errMessages[key])
          }
        }
      })

      return errors
    },
    determineFileType (file) {
      let type = ""
      let fileType
      if (!file) return type
      if (file instanceof File) {
        fileType = file.type
      }
      else if (file instanceof String) {
        fileType = file
      }
      else {
        console.warn("File Type cannot be determine, must be type of String or File.")
        return type
      }

      if (fileType.indexOf("image") !== -1) {
        type = "image"
      }
      else if (fileType.indexOf("video") !== -1) {
        type = "video"
      }
      else {
        type = "raw"
      }
      return type
    },
    // getArrayOfAPIDataAndCount (app, store, route, filter) {

    // },
    getLocaleLangCode (localeValue) {
      const LOCALE_LANG = {
        en: "English",
        zh: "中文"
      }
      if (!localeValue) {
        return console.warn("Unable to get locale code. Locale value is required.")
      }
      return LOCALE_LANG[localeValue] || "us"
    },
    getSchemaObjAndSetDefaultEmptyObj (collection) {
      const schemaObj = collection.simpleSchema().schema()
      const defaultObj = {}
      Object.keys(schemaObj).forEach((key) => {
        defaultObj[key] = ""
      })
      return defaultObj
    },
    isNumeric (n) {
      return !isNaN(parseFloat(n)) && isFinite(n)
    },
    removeEmptyObjectVariable (obj) {
      Object.keys(obj).forEach(key => {
        if (!obj[key]) {
          delete obj[key]
        }
      })
    }
  }
}

const commonFunction = {
  install (Vue, options) {
    Vue.mixin(mixins)
  }
}

Vue.use(commonFunction)


export default (context, inject) => {
  // inside into nuxt context (ssr)
  inject("commonFunction", mixins.methods)
}
