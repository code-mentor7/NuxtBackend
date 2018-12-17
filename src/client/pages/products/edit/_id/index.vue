<template>
  <div>
    <v-toolbar
      prominent
      dense >
      <v-menu
        bottom
        right
        transition="slide-x-transition">
        <v-tooltip
          slot="activator"
          bottom>
          <v-btn
            slot="activator"
            class="primary black--text"
            icon
          >
            <v-icon >language</v-icon>
          </v-btn>
          <span v-text="languageOptionText"/>
        </v-tooltip>

        <v-list>
          <v-list-tile
            v-for="(item, i) in langList"
            v-if="item.value != lang"
            :key="i"
            @click="changeLang(item.value)"
          >
            <v-list-tile-title>{{ $t(item.value) }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-chip color="primary">{{ languageText }}</v-chip>
      <v-spacer/>
      <v-breadcrumbs >
        <v-icon slot="divider">chevron_right</v-icon>
        <v-breadcrumbs-item
          :to="{name: `index___${$i18n.locale}`}"
          exact>
          Home
        </v-breadcrumbs-item>
        <v-breadcrumbs-item
          :to="{name: `products___${$i18n.locale}`}"
          exact>
          Products
        </v-breadcrumbs-item>
        <v-breadcrumbs-item disabled>
          Edit Product
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-toolbar>
    <v-container fluid>
      <v-layout
        justify-center
        align-center>
        <v-flex xs12>
          <product-form
            v-if="localProd"
            v-model="localProd"
            :submitted="submitted"
            @submit="save"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ProductForm from "~/components/Products/ProductForm.vue"
import { mapState } from "vuex"
import _ from "lodash"
export default {
  async asyncData ({ app, store, redirect, route }) {
    try {
      if (!route.params.id) return redirect("/")
      const apiCallController = app.$helpers.generateAPICallController({
        apiEndpoint: `/api/products/edit/${route.params.id}`,
        axios: app.$axios,
        query: app.$helpers.setSearchQuery()
      })
      const product = await apiCallController.getAll()
      if (!product || product.length === 0) {
        // redirect to 404
        return redirect("/")
      }
      return {
        product
      }
    }
    catch (err) {
      console.log("&&&", err)
    }
  },
  components: {
    ProductForm
  },
  data () {
    let defaultData = {
      name: "",
      sku: "",
      submitted: false,
      message: "",
      messageType: "success",
      lang: this.$i18n.locale,
      langList: [
        { id: 0, value: "en", name: "English" },
        { id: 1, value: "zh", name: "中文" }
      ],
      // languageOptionText: "",
      languageText: "",
      localProd: null
    }
    return defaultData
  },
  computed: {
    languageOptionText () {
      if (this.$i18n.locale === "en") {
        return "Change to other language version"
      }
      else {
        return "更换语言版本"
      }
    }
    // languageText () {
    //   if (this.lang === "en") {
    //     return this.lang === "en" ? "English version" : "英文版本"
    //   }
    //   else {
    //     return this.lang === "en" ? "Chinese version" : "中文版本"
    //   }
    // }
    // localProd () {
    //   console.log("### localProd")
    //   if (this.$i18n.locale === "en") {
    //     return { ...this.product }
    //   }
    //   else {
    //     return this.setTranslationAsPrimary()
    //   }
    // }
  },
  watch: {
    // lang (value) {
    //   if (value === "en") {
    //     this.languageText = this.$i18n.locale === "en" ? "English version" : "英文版本"
    //     // this.languageOptionText = "Change to other language version"
    //     // this.localProd = { ...this.product }
    //   }
    //   else {
    //     this.languageText = this.$i18n.locale === "en" ? "Chinese version" : "中文版本"
    //     // this.languageOptionText = "更换语言版本"
    //     // this.localProd = { ...this.setTranslationAsPrimary() }
    //   }
    // }
  },
  created () {
    this.setProductDataByLocale()
    // this.lang = this.$i18n.locale
  },
  mounted () {
    console.log("### mounted", this.product)
    this.localProd = { ...this.product }

    // if (this.lang === "en") {
    //   this.localProd = Object.assign({}, { ...this.product })
    // }
    // else {
    //   this.localProd = Object.assign({}, { ...this.setTranslationAsPrimary() })
    // }
    // let query = { _id: this.setObjectId(this.$route.params.id), merchant_id: this.merchantData._id }
    // if (!this.userIsAdmin) {
    //   query.created_by = Meteor.userId()
    // }
    // this.$subscribe("getOneProduct", () => [query])
  },
  methods: {
    changeLang (selectedLang) {
      this.lang = selectedLang
      this.setProductDataByLocale()
    },
    generateController () {
      return this.$helpers.generateAPICallController({
        apiEndpoint: "/api/products",
        axios: this.$axios,
        query: this.$helpers.setSearchQuery(this.query)
      })
    },
    setProductDataByLocale () {
      if (this.lang === "en") {
        this.localProd = { ...this.product }
        this.languageText = this.$i18n.locale === "en" ? "English version" : "英文版本"
      }
      else {
        this.languageText = this.$i18n.locale === "en" ? "Chinese version" : "中文版本"
        this.localProd = { ...this.setTranslationAsPrimary() }
      }
    },
    setTranslationAsPrimary () {
      let searchForExisting = _.find(this.product.translation, { lang: this.lang })
      let prod = { ...this.localProd }
      prod.name = null
      prod.description = null
      prod.location_to_be_display = null
      prod.highlights = null
      prod.includes = null
      prod.duration = null
      prod.terms_and_conditions = null
      prod.itinerary = []
      prod.tour_guide = []
      if (searchForExisting) {
        return { ...prod, ...searchForExisting }
      }
      else {
        return { ...prod }
      }
    },
    setTranslationToArr () {
      // let translationData = {...this.productFormData};
      let translationAttr = {
        name: this.localProd.name,
        description: this.localProd.description,
        location_to_be_display: this.localProd.location_to_be_display,
        highlights: this.localProd.highlights,
        includes: this.localProd.includes,
        duration: this.localProd.duration,
        terms_and_conditions: this.localProd.terms_and_conditions,
        itinerary: this.localProd.itinerary,
        tour_guide: this.localProd.tour_guide,
        lang: this.lang
      }
      let oriData = { ...this.localProd }
      delete oriData.name
      delete oriData.description
      delete oriData.location_to_be_display
      delete oriData.highlights
      delete oriData.includes
      delete oriData.duration
      delete oriData.terms_and_conditions
      delete oriData.itinerary
      delete oriData.tour_guide

      if (typeof oriData.translation === "undefined") {
        oriData.translation = []
      }
      let searchForExisting = _.find(oriData.translation, { lang: this.lang })

      if (searchForExisting) {
        _.each(oriData.translation, (item, index) => {
          if (item.lang === this.lang) {
            oriData.translation[index] = translationAttr
          }
        })
      }
      else {
        oriData.translation.push(translationAttr)
      }

      return oriData
    },
    async save () {
      this.submitted = false
      let prodAttr = this.localProd
      const imageVariableNameArr = [
        "other_image_ids",
        "primary_image_id",
        "travel_insurance_file_id"
      ]

      try {
        if (this.lang !== "en") {
          prodAttr = this.setTranslationToArr()
        }
        else {
          delete prodAttr.translation
        }
        console.log("### ", prodAttr)
        let formData = new FormData()
        // TODO: refactor
        for (let name of imageVariableNameArr) {
          if (Array.isArray(prodAttr[name])) {
            prodAttr[name].forEach((value) => {
              if (this.$helpers.getType(value.image_file) === "FileList") {
                formData.append(name, value.image_file[0])
              }
            })
          }
          else {
            if (this.$helpers.getType(prodAttr[name]) === "FileList") {
              formData.append(name, prodAttr[name][0])
            }
          }
        }

        formData.append("jsonObj", JSON.stringify(prodAttr))
        // TODO: refetch  / replace doc with new doc
        await this.$axios.$put(`/api/products/edit/${this.$route.params.id}`, formData)
        this.submitted = true
        this.$store.dispatch("setupSnackbar", {
          show: true,
          text: "Product updated.",
          type: "success"
        })
      }
      catch (err) {
        console.log("### ", err)
        this.submitted = true
        this.$store.dispatch("setupSnackbar", {
          show: true,
          text: "We are unable to update your product at the moment.",
          type: "error"
        })
      }
    }

  },
  i18n: {
    messages: {
      en: {
        en: "English",
        zh: "Chinese"
      },
      zh: {
        en: "英文",
        zh: "中文"
      }
    }
  }
  // meteor: {
  //   product () {
  //     let prod = Products.findOne({ _id: this.setObjectId(this.$route.params.id), merchant_id: this.merchantData._id })
  //     if (this.$subReady.getOneProduct && !prod) {
  //       this.$router.push({ name: "notfound", params: { 0: "404" } })
  //     }
  //     return prod
  //   },
  //   subReady () {
  //     this.setLoading(!this.$subReady.getOneProduct)
  //     return !this.$subReady.getOneProduct
  //   },
  //   userIsAdmin () {
  //     return Roles.userIsInRole(Meteor.userId(), ["admin"], "backend")
  //   }
  // }
}
</script>
