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
        <v-card class="elevation-10">
          <v-toolbar
            dark
            class="blue-gradient">
            <v-toolbar-title class="font-weight-thin">96Travel Center</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-form @submit.prevent="login">
            <v-card-text>
              <v-text-field
                v-model.trim="email"
                :error-messages="$helpers.checkError('email', validationProps, $v)"
                prepend-icon="person"
                name="email"
                label="Email"
                type="text"
                @input="$v.email.$touch()"/>
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
              <v-btn
                :to="{name:`forgot-password___${$i18n.locale}`}"
                class="primary--text"
                flat
                exact>Forgot password ?</v-btn>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :to="{name:`signup___${$i18n.locale}`}"
                class="primary--text"
                flat
                exact>Create account</v-btn>
              <v-spacer/>
              <v-btn
                :loading="submitted"
                class="light-blue accent-3 white--text"
                type="submit"
                @click.prevent="login">SIGN IN</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  required,
  email
} from "vuelidate/lib/validators"
import { validationMixin } from "vuelidate"

export default {
  auth: false,
  middleware: ["guest-only"],
  mixins: [ validationMixin ],
  data () {
    return {
      showPassword: false,
      password: null,
      email: null,
      submitted: false,
      isErr: false,
      message: "",
      validationProps: {
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    }
  },
  computed: {
    // ...mapGetters("layout", [
    //   "inactive"
    // ])
  },
  methods: {
    login () {
      this.isErr = false
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.submitted = true

        this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then(async () => {
            this.submitted = false
            this.$store.dispatch("setupSnackbar", {
              show: true,
              text: "Welcome Back !",
              type: "success"
            })
            if (this.$auth.user) {
              await this.$store.commit("SET_IS_DARK_THEME", this.$auth.user.dark_theme)
              await this.$store.commit("SET_LOCALE_LANG", this.$auth.user.localeLang)
              await this.$store.commit("i18n/I18N_SET_LOCALE", this.$auth.user.localeLang)
              if (this.$auth.user.localeLang !== "en") {
                return this.$nuxt.$router.push(this.localePath("index", "zh"))
              }
            }
            this.$nuxt.$router.push("/")
          })
          .catch((err) => {
            this.submitted = false
            let text = "Invalid email or password."
            if (err.response.status === 403) {
              text = "Account is not verified. Please check your email for verification."
            }
            this.$store.dispatch("setupSnackbar", {
              show: true,
              text,
              type: "error"
            })
          })
      }
    }
  },
  validations () {
    return this.validationProps
  }
}
</script>

<style >
/* i, label, .v-counter, .v-message {
  color: grey !important;
} */

</style>
