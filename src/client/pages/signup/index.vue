<template>
  <v-container
    fluid
    fill-height>
    <v-layout
      align-center
      justify-center>
      <v-flex
        xs12
        sm8
        md4>
        <v-alert
          v-model="isShowMessage"
          :type="messageType"
          dismissible
          transition="scale-transition"
        >
          {{ message }}
        </v-alert>
        <v-card class="elevation-10">
          <v-toolbar
            dark
            class="blue-gradient">
            <v-toolbar-title class="font-weight-thin">Join 96Travel Center</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-form @submit.prevent="signup">
            <v-card-text>
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
                :error-messages="checkError('mobile_number', validationProps, $v, 'Mobile Number')"
                prepend-icon="phone"
                name="mobile_number"
                label="Mobile Number"
                type="number"
                @input="$v.mobile_number.$touch()"/>
              <v-text-field
                :error-messages="checkError('password', validationProps, $v)"
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
                :error-messages="checkError('confirm_password', validationProps, $v, 'Password')"
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
              <v-text-field
                v-model.trim="merchant_name"
                :error-messages="checkError('merchant_name', validationProps, $v, 'Merchant/Company Name')"
                disabled
                placeholder="e.g 96Travel"
                prepend-icon="business"
                name="merchant_name"
                label="Merchant/Company Name"
                type="text"
                @input="$v.merchant_name.$touch()"/>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :to="{name:'signin'}"
                class="primary--text"
                flat
                exact>SIGN IN</v-btn>
              <v-spacer/>
              <v-btn
                :loading="submitted"
                class="light-blue accent-3 white--text"
                type="submit"
                @click.prevent="signup">SIGN UP</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from "lodash"
import { validationMixin } from "vuelidate"
import {
  email,
  minLength,
  required,
  sameAs
} from "vuelidate/lib/validators"

export default {
  auth: false,
  middleware: ["guest-only"],
  mixins: [ validationMixin ],
  data: function () {
    return {
      showPassword: false,
      showConfirmPassword: false,
      merchant_name: "96Travel",
      password: null,
      confirm_password: null,
      mobile_number: null,
      email: null,
      submitted: false,
      isShowMessage: false,
      emailVerified: false,
      emailVerifiedMessage: [],
      emailCheckLoading: false,
      message: "",
      messageType: "error",
      isEmailExist: [],
      validationProps: {
        mobile_number: { required },
        merchant_name: { required },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(5)
        },
        confirm_password: {
          sameAsPassword: sameAs("password")
        }
      }
    }
  },
  computed: {
    emailErrors () {
      let err = this.checkError("email", this.validationProps, this.$v)
      return [...err, ...this.isEmailExist]
    }
  },
  mounted () {
    this.debouncedSearch = _.debounce(this.checkEmailValidity, 700)
  },
  methods: {
    signup () {
      // TODO: email custom validation for unique check
      this.$v.$touch()
      if (!this.$v.$invalid && this.emailVerified === true) {
        this.submitted = true
        const attr = {
          name: this.name,
          password: this.password,
          email: this.email,
          contact_number: this.mobile_number,
          roles: this.roles
        }
        this.removeEmptyObjectVariable(attr) // Remove empty value prior to create
        let msg = "Account created. We have sent you an email for verification."
        let type = "success"
        this.$axios.$post("/api/auth/signup", attr)
          .then((response) => {
            this.submitted = false
            this.$nuxt.$router.push("/")
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
            msg = "We are unable to sign you up at this moment."
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
  validations () {
    return this.validationProps
  }
}
</script>

<style>

</style>
