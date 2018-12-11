<template>
  <v-container class=" ">
    <v-layout
      row
      wrap>
      <v-flex xs12>
        <v-card class="v-form">
          <v-container class="pt-0 ">
            <v-layout
              row
              wrap>
              <v-flex xs12>
                <v-list one-line>
                  <v-subheader>Upload Agoda Files</v-subheader>
                  <v-divider/>
                  <v-list-tile>
                    <v-list-tile-action>
                      <input
                        ref="hotel_file"
                        type="file"
                        style="display:none"
                        name="hotel_file"
                        @change="filesChange($event.target.name, $event.target.files, $event)">
                      <v-tooltip
                        v-show="!hotel_file && !hotel_filename"
                        top>
                        <v-btn
                          slot="activator"
                          flat
                          small
                          fab
                          color="primary"
                          @click="trigger('hotel_file')">
                          <v-icon>attach_file</v-icon>
                        </v-btn>
                        Attach file
                      </v-tooltip>
                      <v-tooltip
                        v-show="hotel_file || hotel_filename"
                        top>
                        <v-btn
                          slot="activator"
                          flat
                          fab
                          small
                          color="red"
                          @click="removeFile(hotel_file, 'hotel_file')">
                          <v-icon>close</v-icon>
                        </v-btn>
                        <span>Remove file</span>
                      </v-tooltip>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title v-show="!hotel_file && !hotel_filename">No file</v-list-tile-title>
                      <v-list-tile-title v-if="hotel_filename">{{ hotel_filename }}</v-list-tile-title>
                    </v-list-tile-content>

                  </v-list-tile>
                </v-list>
              </v-flex>
              <v-flex v-if="uploading">
                <v-progress-linear
                  v-model="uploadProgress"
                  :buffer-value="bufferValue"
                  background-color="black"
                  buffer
                  height="20"
                />
                <v-chip
                  color="red"
                  text-color="white">{{ uploadProgress }}%</v-chip>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn
              :loading="loading"
              class="light-blue accent-3 white--text"
              type="submit"
              @click.prevent="upload">Upload</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { mapActions, mapGetters } from "vuex"
// import Papa from "papaparse"
export default {
  data () {
    return {
      hotel_file: null,
      hotel_filename: "",
      loading: false,
      uploadProgress: 5,
      uploading: false,
      bufferValue: 100
    }
  },
  methods: {
    // ...mapActions("layout", [
    //   "setupSnackbar"
    // ]),
    trigger (ref) {
      this.$refs[ref].click()
    },
    removeFile (imageId, ref, index) {
      this.hotel_filename = ""
      this.$refs[ref].value = ""
      this[ref] = null
      $(`#${ref}`).attr("src", "")
    },
    filesChange (fieldName, fileList, event) {
      // handle file changes
      if (!fileList.length) return
      if (fieldName == "hotel_file") {
        this.hotel_file = fileList
        this.hotel_filename = fileList[0].name
      }
    },
    async upload () {
      let message = "Upload Successful."
      let type = "success"
      // this.loading = true;
      if (this.hotel_file && this.hotel_file.length > 0 && this.hotel_file[0] instanceof File) {
        this.uploading = true
        this.uploadProgress = 0
        let size = this.hotel_file[0].size
        let percent = 0
        let datas = []
        this.uploadProgress = 0
        let formData = new FormData()
        formData.append("hotel_file", this.hotel_file[0])
        await this.$axios.$post(`/api/hotelData/upload`, formData)
        // Papa.parse(this.hotel_file[0], {
        //   header: true,
        //   // worker: true,
        //   fastMode: true,
        //   skipEmptyLines: true,
        //   chunk: (results, parser) => {
        //     datas = datas.concat(results.data)
        //     let progress = results.meta.cursor

        //     let newPercent = Math.round(progress / size * 100)
        //     // datas = datas.concat(results.data);

        //     Meteor.call("insertHotelData", results.data)
        //     if (newPercent === percent) return
        //     percent = newPercent
        //     this.uploadProgress = percent
        //     // console.log("progress", progress, size);
        //     // console.log(newPercent, percent);
        //   },
        //   complete: () => {
        //     this.uploadProgress = 100

        //     this.setupSnackbar({
        //       show: true,
        //       text: message,
        //       type: type
        //     })
        //     //  this.uploading = false;
        //     this.loading = false
        //   }
        // })
      }
      else {
        this.loading = false
        message = "No file chosen."
        type = "warning"
        this.setupSnackbar({
          show: true,
          text: message,
          type: type
        })
      }
    }
  }

}
</script>

<style>

</style>
