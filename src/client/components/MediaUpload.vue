<template>
  <v-list two-line>
    <slot name="uploadSubHeader"/>
    <v-list-tile avatar>
      <v-list-tile-action>
        <input
          :accept="acceptedMediaType"
          type="file"
          style="display:none"
          name="localMediaId"
          @change="filesChange($event.target.name, $event.target.files)"
        >
        <v-tooltip
          v-show="!localMediaId"
          top>
          <v-btn
            slot="activator"
            flat
            small
            fab
            color="primary"
            @click="trigger()">
            <v-icon>attach_file</v-icon>
          </v-btn>
          Attach File
        </v-tooltip>
        <v-tooltip
          v-show="localMediaId"
          top>
          <v-btn
            slot="activator"
            flat
            fab
            small
            color="red"
            @click="removeMedia(localMediaId)">
            <v-icon>close</v-icon>
          </v-btn>
          <span>Remove image</span>
        </v-tooltip>
      </v-list-tile-action>
      <v-list-tile-avatar
        tile
        size="70px">
        <video
          v-if="localMediaType == 'video'"
          width="70"
          height="70"
          poster=""
          controls>
          <source
            :src="localMediaId | cloudinaryVideoUrl"
            type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <img
          v-if="localMediaType == 'image'"
          :src="localMediaId | cloudinaryImageUrl">
      </v-list-tile-avatar>

      <v-list-tile-content>

        <slot name="uploadContentTile">
          <v-list-tile-title v-show="!localMediaId">No {{ localMediaType }}</v-list-tile-title>
          <v-list-tile-title v-if="localMediaName">{{ localMediaName }}</v-list-tile-title>
        </slot>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
// https://stackoverflow.com/questions/4328947/limit-file-format-when-using-input-type-file
import _ from "lodash"
export default {
  props: {
    // mediaId: {
    //     type: String
    // },
    mediaName: {
      type: String
    },
    mediaType: {
      type: String
    },
    value: {
      required: true
    }
    // index: {
    //     type: Number
    // }
  },
  // props: ['mediaId', 'mediaName', 'mediaType', 'ref'],
  data () {
    return {
      localMediaName: this.mediaName,
      localMediaId: this.value,
      localMediaType: this.mediaType,
      file: [],
      acceptedMediaType: "image/*"
    }
  },
  watch: {
    value (val) {
      this.localMediaId = val
    },
    mediaType (val) {
      this.localMediaType = val
      if (val != "image") {
        this.acceptedMediaType = ""
      }
    },
    mediaName (val) {
      this.localMediaName = val
    }
  },
  mounted () {
    if (this.localMediaType !== "image") {
      this.acceptedMediaType = ""
    }
  },
  methods: {
    trigger () {
      this.$el.querySelector("input[type=\"file\"]").click()
    },
    removeMedia (imageId) {
      let fileType = imageId[0] instanceof File
      this.localMediaName = null
      this.$el.querySelector("input[type=\"file\"]").value = ""
      if (this.localMediaType === "image") {
        this.$el.querySelector("img").setAttribute("src", "")
      }
      else if (this.localMediaType === "video") {
        this.$el.querySelector("video source").setAttribute("src", "")
        this.$el.querySelector("video").load()
      }
      this.file = []
      this.localMediaId = null
      this.$emit("input", null)
      if (imageId && fileType === false) {
        this.$emit("removeMedia", imageId, this.localMediaType)
      }
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      if (!fileList.length) return
      this.localMediaName = fileList[0].name
      this.localMediaId = fileList
      this.file = fileList
      this.$emit("input", fileList)
      let reader = new FileReader()
      reader.onload = (e) => {
        if (this.localMediaType === "image") {
          this.$el.querySelector("img").setAttribute("src", e.target.result)
        }
        else if (this.localMediaType === "video") {
          this.$el.querySelector("video source").setAttribute("src", e.target.result)
          this.$el.querySelector("video").load()
        }
      }

      reader.readAsDataURL(fileList[0])
    },
    getFile () {
      let file = [...this.file]
      this.file = []
      return file
    }
  }
}
</script>

<style>

</style>
