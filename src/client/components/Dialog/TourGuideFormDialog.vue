<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="400px"
    @keydown.esc="close()">
    <v-card>
      <v-card-title
        class="headline primary"
        primary-title
      >
        {{ $t(type) | capitalize }}  {{ $t('tour_guide') }}
        <v-spacer/>
        <v-btn
          class="white--text"
          icon
          @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-sm>
          <v-layout wrap>
            <v-flex
              xs12
              sm5
              md5>
              <v-text-field
                :label="$t('tour_guide_name')"
                :error-messages="$helpers.checkError('tour_guide_name', validationProps, $v, 'name')"
                v-model.number="tour_guide_name"
                type="text"
                name="tour_guide_name"
              />
            </v-flex>
            <v-flex
              xs12
              sm5
              md5
              offset-xs1>
              <v-text-field
                :label="$t('price')"
                :error-messages="$helpers.checkError('tour_guide_price', validationProps, $v, 'price')"
                v-model.number="tour_guide_price"
                type="number"
                name="tour_guide_price"
              />
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
  mixins: [ validationMixin ],
  data () {
    let defaultData = {
      dialog: false,
      tour_guide_name: "",
      tour_guide_price: "",
      type: "",
      index: null,
      validationProps: {
        tour_guide_name: { required },
        tour_guide_price: { required }
      }
    }
    return defaultData
  },
  i18n: {
    messages: {
      en: {
        add: "Add",
        close: "Close",
        edit: "Edit",
        price: "Price",
        save: "Save",
        tour_guide: "Tour Guide",
        tour_guide_name: "Name"
      },
      zh: {
        add: "添加",
        close: "关闭",
        edit: "修改",
        price: "价格",
        save: "储存",
        tour_guide: "导游",
        tour_guide_name: "导游类型名称"
      }
    }
  },
  methods: {
    open (type, item, index) {
      this.dialog = true
      this.type = type
      if (type === "edit" && typeof item !== "undefined") {
        //   this.index = index;
        //   this.title = item.title;
        //   this.content_title = item.content_title;
        //   this.content = item.content;
        //   this.notes = item.notes;
      }
    },
    close () {
      this.dialog = false
      this.tour_guide_name = ""
      this.tour_guide_price = ""
      this.$v.$reset()
    },
    save () {
      let props = {
        tour_guide_name: this.tour_guide_name,
        tour_guide_price: this.tour_guide_price
      }
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$emit(this.type, props, this.index)
        this.close()
      }
    }
  },
  validations () {
    return this.validationProps
  }
}
</script>

<style>

</style>
