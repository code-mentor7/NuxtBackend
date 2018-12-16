<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="700px"
    @keydown.esc="close()">
    <v-card>
      <v-card-title
        class="headline primary"
        primary-title
      >
        {{ $t(type) | capitalize }} {{ $t('itinerary') }}
        <v-spacer/>
        <v-btn
          class="white--text"
          icon
          @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex
              xs12
              sm6
              md6>
              <v-text-field
                :label="$t('title')"
                v-model.trim="title"
                :error-messages="$helpers.checkError('title', validationProps, $v)"
                hint="e.g Day 1"
                @input="$v.title.$touch()"
              />
            </v-flex>
            <v-flex
              xs12
              sm6
              md6>
              <v-text-field
                :label="$t('content_title')"
                v-model.trim="content_title"
                hint="e.g Jeju Island"/>
            </v-flex>
            <v-flex xs12>
              <no-ssr placeholder="Loading...">
                <quill
                  v-model="content"
                  :label="$t('content')"/>
                  <!-- <h-t-m-l-editor
                  v-if="dialog"
                  :label="$t('content')"
                  :data="content"
                  :id="'js-editor-itinerary'"/> -->
              </no-ssr>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model.trim="notes"
                :persistent-hint="true"
                :label="$t('notes')"
                :no-resize="true"
                :hint="$t('notes_hint')"
                name="notes"
                clearable
                counter/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          flat
          @click.native="save()">{{ $t('save') }}</v-btn>
        <v-btn
          color="grey"
          flat
          @click.native="close()">{{ $t('close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  required
} from "vuelidate/lib/validators"
import { validationMixin } from "vuelidate"

export default {
  components: {
    Quill: () => import("~/components/Quill.vue")
  },
  mixins: [ validationMixin ],
  data () {
    let defaultData = {
      dialog: false,
      title: "",
      content_title: "",
      content: "",
      notes: "",
      type: "",
      index: null,
      validationProps: {
        title: {
          required
        }
      }
    }
    return defaultData
  },
  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.required && errors.push("Title is required")
      return errors
    }
  },
  i18n: {
    messages: {
      en: {
        add: "Add",
        close: "Close",
        content: "Content",
        content_title: "Content Title",
        edit: "Edit",
        itinerary: "itinerary",
        notes: "Notes",
        notes_hint: "Reminder for customer. e.g Bring towel",
        save: "Save",
        title: "Title"

      },
      zh: {
        add: "添加",
        close: "关闭",
        content: "行程和内容",
        content_title: "行程标题",
        edit: "修改",
        itinerary: "行程",
        notes: "备注",
        notes_hint: "提醒客户的备注或重要事项，例如： 准备毛巾",
        save: "储存",
        title: "天数"
      }
    }
  },
  methods: {
    open (type, item, index) {
      this.dialog = true
      this.type = type
      if (type === "edit" && typeof item !== "undefined") {
        this.index = index
        this.title = item.title
        this.content_title = item.content_title
        this.content = item.content
        this.notes = item.notes
      }
    },
    close () {
      this.dialog = false
      this.title = ""
      this.content_title = ""
      this.notes = ""
      this.content = null
      this.$v.$reset()
    },
    save () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let props = {
          title: this.title,
          content_title: this.content_title,
          content: $("#js-editor-itinerary").trumbowyg("html"),
          notes: this.notes
        }
        this.$emit(this.type, props, this.index)
        this.close()
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
