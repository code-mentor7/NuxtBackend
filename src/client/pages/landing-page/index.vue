<template>
  <v-form @submit.prevent="submit">
    <v-container class=" ">
      <v-layout
        row
        wrap>
        <!--  Main Carousel Start  -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandMainCarousel"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">MAIN CAROUSEL</div>
              <v-card class="v-form">
                <v-container class="pt-0 ">
                  <p class="yellow--text">
                    **Only image allowed.
                  </p>
                  <v-layout
                    row
                    wrap>

                    <template v-for="(item, index) in main_carousel">
                      <v-flex
                        :key="index"
                        xs12
                        md6>
                        <v-subheader class="pa-0 primary--text">Carousel {{ index + 1 }}</v-subheader>
                        <v-text-field
                          v-model.trim="item.carousel_header"
                          :name="`carousel_header_${index}`"
                          label="Carousel Header"
                          type="text"/>
                        <v-text-field
                          v-model.trim="item.carousel_content"
                          :name="`carousel_content_${index}`"
                          label="Carousel Text"
                          type="text"/>
                        <mediaUpload
                          v-model="item.media_id"
                          :media-type="item.media_type"
                          :ref="`main_carousel#${index}`"
                          @removeMedia="removeMedia"
                        >
                          <v-subheader
                            slot="uploadSubHeader"
                            class="primary--text">Media <span v-show="item.media_type && item.media_id">[{{ item.media_type }}]</span></v-subheader>
                        </mediaUpload>
                        <v-checkbox
                          v-model="item.carousel_disabled"
                          color="primary"
                          label="Disabled"
                        />
                      </v-flex>
                    </template>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <!--  Main Carousel End  -->

        <!--  Content Start  -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandContent"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">CONTENT</div>
              <v-card class="v-form">
                <v-container class="pt-0 ">
                  <p class="yellow--text">
                    **Image size should be at least 1280 x 853 pixels
                  </p>
                  <v-layout
                    row
                    wrap>
                    <v-flex xs12>
                      <v-text-field
                        v-model.trim="section_title_1"
                        name="section_title_1"
                        label="Section Title"
                        type="text"/>
                    </v-flex>
                    <v-flex
                      xs12
                      md6>
                      <v-subheader class="pa-0 primary--text">Section Content 1</v-subheader>
                      <v-text-field
                        v-model.trim="section_sub_title_1"
                        name="section_sub_title_1"
                        label="Section Sub Title 1"
                        type="text"/>
                      <template v-for="(item, index) in hotel_destination_1">
                        <mediaUpload
                          :key="index"
                          v-model="item.media_id"
                          :media-type="'image'"
                          :ref="`hotel_destination_1#${index}`"
                          @removeMedia="removeMedia"
                        >
                          <v-subheader
                            slot="uploadSubHeader"
                            class="primary--text">Media <span v-show="item.media_type && item.media_id">[image]</span></v-subheader>
                          <v-text-field
                            slot="uploadContentTile"
                            v-model.trim="item.title"
                            :key="`${index}title`"
                            class="pl-3"
                            placeholder="eg: Korea"
                            name="section_sub_title_1"
                            label="Title"
                            type="text"/>
                        </mediaUpload>
                      </template>
                    </v-flex>
                    <v-flex
                      xs12
                      md6>
                      <v-subheader class="pa-0 primary--text">Section Content 2</v-subheader>
                      <v-text-field
                        v-model.trim="section_sub_title_2"
                        name="section_sub_title_2"
                        label="Section Sub Title 2"
                        type="text"/>
                      <template v-for="(item, index) in hotel_destination_2">
                        <mediaUpload
                          :key="index"
                          v-model="item.media_id"
                          :media-type="'image'"
                          :ref="`hotel_destination_2#${index}`"
                          @removeMedia="removeMedia"
                        >
                          <v-subheader
                            slot="uploadSubHeader"
                            class="primary--text">Media <span v-show="item.media_type && item.media_id">[image]</span></v-subheader>
                          <v-text-field
                            slot="uploadContentTile"
                            v-model.trim="item.title"
                            :key="`${index}title`"
                            class="pl-3"
                            placeholder="eg: Korea"
                            name="section_sub_title_2"
                            label="Title"
                            type="text"/>
                        </mediaUpload>
                      </template>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <!--  Content End  -->

        <!--  Text Section Start  -->
        <v-flex xs12>
          <v-expansion-panel
            v-model="expandTextSection"
            expand>
            <v-expansion-panel-content>
              <div
                slot="header"
                class="primary--text font-weight-bold">TEXT SECTION</div>
              <v-card class="v-form">
                <v-container class="pt-0 ">
                  <v-layout
                    row
                    wrap>
                    <v-flex
                      xs12
                      md6>
                      <v-subheader class="pa-0 primary--text">Text Section 1</v-subheader>
                      <v-text-field
                        v-model.trim="section_text_1_title"
                        name="section_text_1_title"
                        label="Title"
                        type="text"/>
                      <v-textarea
                        v-model.trim="section_text_1_content"
                        :no-resize="true"
                        name="section_text_1_content"
                        label="Content"
                        clearable
                        counter
                      />
                      <v-checkbox
                        v-model="section_text_1_disabled"
                        color="primary"
                        label="Disabled"
                      />
                    </v-flex>
                    <v-flex
                      xs12
                      md6>
                      <v-subheader class="pa-0 primary--text">Text Section 2</v-subheader>
                      <v-text-field
                        v-model.trim="section_text_2_title"
                        name="section_text_2_title"
                        label="Title"
                        type="text"/>
                      <v-textarea
                        v-model.trim="section_text_2_content"
                        :no-resize="true"
                        name="section_text_2_content"
                        label="Content"
                        clearable
                        counter
                      />
                      <v-checkbox
                        v-model="section_text_2_disabled"
                        color="primary"
                        label="Disabled"
                      />

                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <!--  Text Section End  -->
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
// import { LandingPage } from '/imports/collections/landingPage';
import bluebird from "bluebird"
import { required } from "vuelidate/lib/validators"
import { validationMixin } from "vuelidate"
import _ from "lodash"

import mediaUpload from "~/components/MediaUpload.vue"

export default {
  async asyncData ({ app, store, redirect, route }) {
    try {
      const landingPage = await app.$axios.$get(`/api/landing-page`)
      return { ...landingPage[0] }
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
      main_carousel: [],
      resourcesToBeRemoved: [],
      hotel_destination_1: [],
      hotel_destination_2: [],
      section_title_1: "",
      section_sub_title_1: "",
      section_sub_title_2: "",
      section_text_1_disabled: "",
      section_text_1_title: "",
      section_text_1_content: "",
      section_text_2_disabled: "",
      section_text_2_title: "",
      section_text_2_content: "",
      submitting: false,
      expandMainCarousel: [false],
      expandTextSection: [false],
      expandContent: [false],
      validationProps: {
        // company_name: { required }
      }
    }
  },
  mounted () {
    this.expandMainCarousel = [true]
    this.expandTextSection = [true]
    this.expandContent = [true]
  },
  methods: {
    removeMedia (mediaId, type) {
      this.resourcesToBeRemoved.push({ type: type, id: mediaId })
    },
    async submit () {
      let uploadPromiseArr = []

      this.$v.$touch()
      if (!this.$v.$invalid) {
        let uploadPromiseArr = []
        this.submitting = true
        let formData = new FormData()
        _.each(this.$refs, (value, key) => {
          // TODO: why ref is array ?
          if (Array.isArray(value)) {
            value = value[0]
          }
          if (typeof value.getFile !== "undefined" && value.file.length > 0) {
            formData.append(`${key}`, value.getFile()[0])
          }
        })

        try {
          formData.append("jsonObj", JSON.stringify(this.$data))
          await this.$axios.$put(`/api/landing-page/${this.$data._id}`, formData)
          this.submitting = false
          this.$store.dispatch("setupSnackbar", {
            show: true,
            text: "Landing Page updated.",
            type: "success"
          })
        }
        catch (err) {

        }

        // _.each(this.$refs, (value, key) => {
        //   if (Array.isArray(value)) {
        //     value = value[0]
        //   }
        //   if (typeof value.getFile !== "undefined" && value.file.length > 0) {
        //     let promisify = new Promise((resolve, reject) => {
        //       let file = value.getFile()[0]
        //       this.uploadFile(file, (res) => {
        //         let refArr = key.split("#")
        //         if (refArr.length > 1) {
        //           this[refArr[0]][Number(refArr[1])].media_type = this.determineFileType(file)
        //           this[refArr[0]][Number(refArr[1])].media_id = res
        //         }
        //         else {
        //           this[key] = res
        //         }
        //         resolve()
        //       })
        //     })
        //     uploadPromiseArr.push(promisify)
        //   }
        // })
        // return Promise.all(uploadPromiseArr)
        //   .then(() => {
        //     let message, messageType
        //     let LP = LandingPage.findOne()
        //     Meteor.call("upsertLandingPage", { _id: LP._id }, this.$data, (err, res) => {
        //       this.submitting = false
        //       message = "Landing Page updated."
        //       messageType = "success"
        //       if (err || res == 0) {
        //         console.log(err, res)
        //         message = "Failed to update Landing Page."
        //         messageType = "error"
        //       }
        //       else {
        //         this.resourcesToBeRemoved.map((item, index) => {
        //           Meteor.call("removeCloudinaryResources", item.type, item.id)
        //         })
        //         this.resourcesToBeRemoved = []
        //       }
        //       this.setupSnackbar({
        //         show: true,
        //         text: message,
        //         type: messageType
        //       })
        //     })
        //   })
        //   .catch((err) => {
        //     console.log("err", err)
        //   })
      }
    }
  },
  validations: function () {
    return this.validationProps
  }
}
</script>

<style>

</style>
