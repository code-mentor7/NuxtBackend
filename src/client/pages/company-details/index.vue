<template>
  <v-form @submit.prevent="submit">
    <v-container class=" ">
      <v-layout
        row
        wrap>
        <!--  Company Details Start  -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandCompanyD"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">COMPANY DETAILS</div>
              <v-card class="v-form">
                <v-container class="pt-0 ">
                  <v-layout
                    row
                    wrap>
                    <v-flex xs12>
                      <v-text-field
                        v-model.trim="company_name"
                        :error-messages="$helpers.checkError('company_name', validationProps, $v, 'Company Name')"
                        name="company_name"
                        label="Company Name"
                        type="text"
                        @input="$v.company_name.$touch()"/>
                      <v-text-field
                        v-model.trim="address_line_1"
                        :error-messages="$helpers.checkError('address_line_1', validationProps, $v, 'Address Line 1')"
                        name="address_line_1"
                        label="Address Line 1"
                        type="text"
                        @input="$v.address_line_1.$touch()"/>
                      <v-text-field
                        v-model.trim="address_line_2"
                        name="address_line_2"
                        label="Address Line 2"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      xs12
                      sm3
                      md3>
                      <v-text-field
                        v-model.trim="state"
                        name="state"
                        label="State"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      xs12
                      sm3
                      md3>
                      <v-text-field
                        v-model.trim="city"
                        name="city"
                        label="City"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      xs12
                      sm3
                      md3>
                      <v-text-field
                        v-model.trim="zip_code"
                        name="zip_code"
                        label="Zip Code"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      xs12
                      sm3
                      md3>
                      <v-text-field
                        v-model.trim="country"
                        name="country"
                        label="Country"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="phone_number[0].data"
                        name="phone_number0"
                        label="Phone Number 1"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="phone_number[1].data"
                        name="phone_number1"
                        label="Phone Number 2"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      xs12
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="phone_number[2].data"
                        name="phone_number2"
                        label="Phone Number 3"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="emails[0].data"
                        name="emails-0"
                        label="Email 1"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="emails[1].data"
                        name="emails-1"
                        label="Email 2"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      xs12
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="emails[2].data"
                        name="emails-2"
                        label="Email 3"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="whatsapp[0].data"
                        name="whatsapp-0"
                        label="Whatsapp 1"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="whatsapp[1].data"
                        name="whatsapp-1"
                        label="Whatsapp 2"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      xs12
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="whatsapp[2].data"
                        name="whatsapp-2"
                        label="Whatsapp 3"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="wechat[0].data"
                        name="wechat-0"
                        label="Wechat 1"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="wechat[1].data"
                        name="wechat-1"
                        label="Wechat 2"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      xs12
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="wechat[2].data"
                        name="wechat-2"
                        label="Wechat 3"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="support_emails[0].data"
                        name="support_emails-0"
                        label="Support Email 1"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="support_emails[1].data"
                        name="support_emails-1"
                        label="Support Email 2"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      xs12
                      sm4
                      md4>
                      <v-text-field
                        v-model.trim="support_emails[2].data"
                        name="support_emails-2"
                        label="Support Email 3"
                        type="text"/>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        v-model.trim="fb_url"
                        name="fb_url"
                        label="Facebook URL"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md6>
                      <mediaUpload
                        ref="footer_logo_id"
                        v-model="footer_logo_id"
                        :media-type="'image'"
                        @removeMedia="removeMedia"
                      >
                        <v-subheader
                          slot="uploadSubHeader"
                          class="primary--text">Footer Logo</v-subheader>
                      </mediaUpload>
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md6>
                      <mediaUpload
                        ref="nav_logo_id"
                        v-model="nav_logo_id"
                        :media-type="'image'"
                        @removeMedia="removeMedia"
                      >
                        <v-subheader
                          slot="uploadSubHeader"
                          class="primary--text">Navigation Bar Logo</v-subheader>
                      </mediaUpload>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout
      column
      class="fab-container">
      <v-btn
        :loading="submitting"
        fab
        class="green"
        type="submit">
        <v-icon>save</v-icon>
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import { validationMixin } from "vuelidate"
import _ from "lodash"

import mediaUpload from "~/components/MediaUpload.vue"

export default {
  async asyncData ({ app, store, redirect, route }) {
    try {
      const siteIdentity = await app.$axios.$get(`/api/site-identity`)
      return { ...siteIdentity[0] }
    }
    catch (err) {
      console.log("&&&", err)
    }
  },
  components: {
    mediaUpload
  },
  mixins: [ validationMixin ],
  data () {
    return {
      company_name: "",
      address_line_1: "",
      address_line_2: "",
      state: "",
      city: "",
      zip_code: "",
      country: "",
      phone_number: [
        { data: "" },
        { data: "" },
        { data: "" }
      ],
      emails: [
        { data: "" },
        { data: "" },
        { data: "" }
      ],
      whatsapp: [
        { data: "" },
        { data: "" },
        { data: "" }
      ],
      wechat: [
        { data: "" },
        { data: "" },
        { data: "" }
      ],
      support_emails: [
        { data: "" },
        { data: "" },
        { data: "" }
      ],
      fb_url: "",
      footer_logo_id: "",
      nav_logo_id: "",
      resourcesToBeRemoved: [],
      submitting: false,
      expandCompanyD: [false],
      validationProps: {
        company_name: { required }
      }
    }
  },
  validations: function () {
    return this.validationProps
  },
  mounted () {
    if (this.company_name) {
      this.expandCompanyD = [true]
    }
  },
  methods: {
    removeMedia (mediaId, type) {
      this.resourcesToBeRemoved.push({ type: type, id: mediaId })
    },
    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.submitting = true
        try {
          let formData = new FormData()
          _.each(this.$refs, (value, key) => {
            if (typeof value.getFile !== "undefined" && value.file.length > 0) {
              formData.append(`${key}`, value.getFile()[0])
            }
          })
          formData.append("jsonObj", JSON.stringify(this.$data))
          // https://stackoverflow.com/questions/16104078/appending-array-to-formdata-and-send-via-ajax

          await this.$axios.$put(`/api/site-identity/${this.$data._id}`, formData)
          this.submitting = false
          this.$store.dispatch("setupSnackbar", {
            show: true,
            text: "Company Details updated.",
            type: "success"
          })
        }
        catch (err) {

        }
      }
    }
  }
}
</script>

<style>

</style>
