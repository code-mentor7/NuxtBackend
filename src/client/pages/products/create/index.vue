<template>
  <v-container fluid>
    <v-layout
      justify-center
      align-center>
      <v-flex xs12>
        <product-form
          v-model="product"
          :submitted="submitted"
          @submit="save"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import ProductForm from "~/components/Products/ProductForm.vue"
import _ from "lodash"
export default {
  components: {
    ProductForm
  },
  data () {
    return {
      product: {},
      name: "",
      sku: "",
      submitted: false,
      message: "",
      messageType: "success"
    }
  },
  computed: {
    // merchantId () {
    //     let merchantId = -1;
    //     if(this.merchant){
    //         merchantId = this.merchant._id;
    //     }
    //     return merchantId;
    // }
  },
  mounted () {
    // this.$subscribe('getOneProduct', () => [{slug: this.$route.params.slug, merchant_id: this.merchantId}]);
  },
  methods: {
    async save () {
      const imageVariableNameArr = [
        "other_image_ids",
        "primary_image_id",
        "travel_insurance_file_id"
      ]
      let prodAttr = this.product
      // this.product.merchant_id = this.merchantData._id
      try {
        this.submitted = false
        let formData = new FormData()
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

        const createdProduct = await this.$axios.$post(`/api/products`, formData)
        this.$router.push({ name: `products-edit-id___${this.$i18n.locale}`, params: { id: createdProduct._id } })
        this.submitted = true
        this.$store.dispatch("setupSnackbar", {
          show: true,
          text: "Product created.",
          type: "success"
        })
      }
      catch (err) {
        this.submitted = true
        this.$store.dispatch("setupSnackbar", {
          show: true,
          text: "We are unable to create your product at the moment.",
          type: "error"
        })
      }
    }
  }

  // meteor: {
  //   merchant () {
  //     return Merchants.findOne({ user_ids: { $in: [Meteor.userId()] } })
  //   }
  // }
}
</script>
