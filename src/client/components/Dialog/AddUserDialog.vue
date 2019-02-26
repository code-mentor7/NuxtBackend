<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.mdAndDown"
    v-model="isShow"
    scrollable
    max-width="700px"
    @keydown.esc="close()">
    <v-card>
      <v-card-title
        class="headline primary"
        primary-title
      >
        Add User
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
            <v-flex xs12>
              <v-text-field
                v-model.trim="email"
                :loading="emailCheckLoading"
                :error-messages="emailErrors "
                :success="emailVerified"
                :success-messages="emailVerifiedMessage"
                prepend-icon="email"
                name="email"
                label="Email"
                type="text"
                @input="$v.email.$touch(); emailInput()"/>
              <v-text-field
                v-model.trim="mobile_number"
                :error-messages="$helpers.checkError('mobile_number', validationProps, $v, 'Mobile Number')"
                prepend-icon="phone"
                name="mobile_number"
                label="Mobile Number"
                type="number"
                @input="$v.mobile_number.$touch()"/>
              <v-text-field
                :error-messages="$helpers.checkError('password', validationProps, $v)"
                v-model="password"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="lock"
                name="password"
                label="Password"
                counter
                @input="$v.password.$touch()"
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                :error-messages="$helpers.checkError('confirm_password', validationProps, $v, 'Password')"
                v-model="confirm_password"
                :append-icon="showConfirmPassword ? 'visibility_off' : 'visibility'"
                :type="showConfirmPassword ? 'text' : 'password'"
                prepend-icon="lock"
                name="confirm_password"
                label="Confirm Password"
                counter
                @input="$v.confirm_password.$touch()"
                @click:append="showConfirmPassword = !showConfirmPassword"
              />
              <v-combobox
                :error-messages="$helpers.checkError('roles', validationProps, $v, 'User Role')"
                v-model="roles"
                :items="userRoles"
                item-text="name"
                item-value="_id"
                placeholder="Select user's role"
                hide-selected
                chips
                label="User Roles"
              >
                <template
                  slot="item"
                  slot-scope="data"
                >
                  {{ data.item.name | capitalize }}
                </template>
                <template
                  slot="selection"
                  slot-scope="data"
                >
                  <v-chip
                    :selected="data.selected"
                    :disabled="data.disabled"
                    :key="JSON.stringify(data.item)"
                    class="v-chip--select-multi"
                    @input="data.parent.selectItem(data.item)"
                  >
                    <v-avatar
                      class="accent white--text"
                      v-text="data.item.name.slice(0, 1).toUpperCase()"
                    />
                    {{ data.item.name | capitalize }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          :loading="submitted"
          color="primary"
          flat
          @click.native="save()">Submit</v-btn>
        <v-btn
          color="grey"
          flat
          @click.native="close()">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate"
import {
  required,
  minLength,
  email,
  sameAs
} from "vuelidate/lib/validators"
import _ from "lodash"

export default {
  mixins: [ validationMixin ],
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      confirm_password: null,
      email: null,
      emailCheckLoading: false,
      emailVerified: false,
      emailVerifiedMessage: [],
      isEmailExist: [],
      submitted: false,
      message: "",
      messageType: "error",
      mobile_number: null,
      password: null,
      roles: "",
      showPassword: false,
      showConfirmPassword: false,
      userRoles: [
        // { text: "Admin", value: "admin" },
        // { text: "Product Manager", value: "product_manager" }
      ],
      validationProps: {
        confirm_password: {
          required,
          sameAsPassword: sameAs("password")
        },
        email: {
          required,
          email
        },
        mobile_number: {},
        password: {
          required,
          minLength: minLength(6)
        },
        roles: { required }
      }
    }
  },
  computed: {
    // ...mapGetters("merchant", [
    //   "merchantData"
    // ]),
    emailErrors () {
      let err = this.$helpers.checkError("email", this.validationProps, this.$v)
      return [...err, ...this.isEmailExist]
    },
    isShow: {
      // https://stackoverflow.com/questions/48035310/open-a-vuetify-dialog-from-a-component-template-in-vuejs?rq=1
      get () {
        return this.show
      },
      set (value) {
        if (!value) {
          this.close()
        }
      }
    }
  },
  created () {
    if (this.$helpers.userIsAdmin(this.$auth.user)) {
      this.$axios.$get("/api/roles")
        .then((res) => {
          this.userRoles = res
        })
        .catch()
    }
  },
  mounted: function () {
    this.debouncedSearch = _.debounce(this.checkEmailValidity, 700)
  },
  methods: {
    // ...mapActions("layout", [
    //   "setupSnackbar"
    // ]),
    close () {
      this.$emit("close")
      this.password = ""
      this.confirm_password = ""
      this.mobile_number = ""
      this.email = ""
      this.emailVerifiedMessage = []
      this.emailCheckLoading = false
      this.emailVerified = false
      this.isEmailExist = []
      this.roles = ""
      this.$v.$reset()
    },
    save: function () {
      // TODO: email custom validation for unique check
      this.$v.$touch()
      if (!this.$v.$invalid && this.emailVerified === true) {
        this.submitted = true
        const attr = {
          name: this.name,
          password: this.password,
          email: this.email,
          contact_number: this.mobile_number,
          roles: this.roles._id
        }
        this.$helpers.removeEmptyObjectVariable(attr) // Remove empty value prior to create
        let msg = `Account created. We have sent ${name} an email for verification.`
        let type = "success"
        this.$axios.$post("/api/auth/signup", attr)
          .then((response) => {
            this.submitted = false
            this.isShow = false
            // this.$nuxt.$router.push("/")
            this.$store.dispatch("setupSnackbar", {
              show: true,
              text: msg,
              type
            })
          })
          .catch(() => {
            this.submitted = false
            this.$v.$reset()
            type = "error"
            msg = "We are unable to add user at this moment."
            this.$store.dispatch("setupSnackbar", {
              show: true,
              text: msg,
              type
            })
          })
      }
    },
    emailInput () {
      this.emailVerified = false
      this.emailVerifiedMessage = []
      if (!this.$v.email.$invalid) {
        this.emailCheckLoading = true
        this.debouncedSearch()
      }
    },
    checkEmailValidity () {
      this.$axios.$post("/api/auth/user/check", { email: this.email })
        .then((response) => {
          this.emailCheckLoading = false
          if (response.exists !== "undefined" && response.exists === false) {
            this.emailVerified = true
            this.emailVerifiedMessage = ["Email valid"]
            this.isEmailExist = []
          }
        })
        .catch(() => {
          this.emailCheckLoading = false
          this.isEmailExist = ["Email already exist"]
        })
    }
  },
  validations: function () {
    return this.validationProps
  }
}
</script>

<style>

</style>
