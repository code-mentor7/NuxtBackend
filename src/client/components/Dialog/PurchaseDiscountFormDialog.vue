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
        {{ $t(type) | capitalize }}&nbsp;<span v-show="category"> {{ $t(category) | capitalize }} </span>&nbsp;{{ $t('purchase_discount') }}
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
                :label="$t('purchase_unit')"
                :error-messages="$helpers.checkError('purchase_unit', validationProps, $v, 'Purchase Unit')"
                v-model.number="purchase_unit"
                type="number"
                name="purchase_unit"
              />
            </v-flex>
            <v-flex
              xs12
              sm5
              md5
              offset-xs1>
              <v-text-field
                :label="$t('price')"
                :error-messages="$helpers.checkError('purchase_discount', validationProps, $v, 'Price')"
                v-model.number="purchase_discount"
                type="number"
                name="purchase_discount"
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
import _ from "lodash"
import { mapActions } from "vuex"

export default {
  mixins: [ validationMixin ],
  data () {
    let defaultData = {
      dialog: false,
      purchase_discount: "",
      purchase_unit: "",
      type: "",
      category: "",
      index: null,
      pdSavedData: [],
      validationProps: {
        purchase_discount: { required },
        purchase_unit: { required }
      }
    }
    return defaultData
  },
  i18n: {
    messages: {
      en: {
        add: "Add",
        adult: "Adult",
        child: "Child",
        close: "Close",
        edit: "Edit",
        price: "Price",
        purchase_discount: "Purchase Discount",
        purchase_unit: "Purchase Unit",
        save: "Save"
      },
      zh: {
        add: "添加",
        adult: "大人",
        child: "小孩",
        close: "关闭",
        edit: "修改",
        price: "价格",
        purchase_discount: "购买折扣",
        purchase_unit: "购买单位",
        save: "储存"
      }
    }
  },
  methods: {
    ...mapActions("layout", [
      "setupSnackbar"
    ]),
    open (type, category, item, index, pdSavedData) {
      this.pdSavedData = pdSavedData
      this.dialog = true
      this.type = type
      this.category = category
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
      this.purchase_discount = ""
      this.purchase_unit = ""
      this.$v.$reset()
    },
    save () {
      let props = {}
      props[`${this.category}_purchase_discount`] = this.purchase_discount
      props[`${this.category}_purchase_unit`] = this.purchase_unit
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let query = {}
        query[`${this.category}_purchase_unit`] = props[`${this.category}_purchase_unit`]
        let searchForDuplicate = _.find(this.pdSavedData, query)
        if (searchForDuplicate) {
          this.setupSnackbar({
            show: true,
            text: "Purchase Unit already exists. Maybe update it?",
            type: "error"
          })
        }
        else {
          this.$emit(this.type, this.category, props, this.index)
          this.close()
        }
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
