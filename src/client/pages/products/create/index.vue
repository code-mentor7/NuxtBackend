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
      console.log("this.productFormData", this.product)
      // this.product.merchant_id = this.merchantData._id
      try {
        this.submitted = false
        await this.$axios.$post(`/api/products`, this.product)
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
