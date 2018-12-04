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
          v-model="isAlert"
          :type="alertType"
          dismissible
          transition="scale-transition"
        >
          {{ message }}
        </v-alert>
        <v-card class="elevation-10">
          <v-toolbar
            dark
            class="blue-gradient">
            <v-toolbar-title class="font-weight-thin">Forgot Password</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-form @submit.prevent="forgotPass">
            <v-card-text>
              <v-text-field
                v-model.trim="email"
                :error-messages="checkError('email', validationProps, $v)"
                prepend-icon="person"
                name="email"
                label="Email"
                type="text"
                @input="$v.email.$touch()"/>
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
                @click.prevent="forgotPass">SUBMIT</v-btn>
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
      email: null,
      submitted: false,
      isAlert: false,
      alertType: "success",
      message: "",
      validationProps: {
        email: {
          required,
          email
        }
      }
    }
  },
  methods: {
    forgotPass () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.submitted = true
        this.$axios.$post("/api/auth/forgot-password", { email: this.email })
          .then(response => {
            this.submitted = false
            this.$nuxt.$router.push("/")
            this.$store.dispatch("setupSnackbar", {
              show: true,
              text: "Instructions to reset your password has been sent to your inbox.",
              type: "success"
            })
          })
          .catch((err) => {
            this.submitted = false
            this.$v.$reset()
            let type = "error"
            let msg = "Email invalid."
            if (err.response.status === 403) {
              type = "warning"
              msg = "Please verify your account first."
            }
            if (err.response.status === 418) {
              type = "error"
              msg = "Your account is locked. Please contact support for further assistance"
            }
            this.$store.dispatch("setupSnackbar", {
              show: true,
              text: msg,
              type
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

<style>

</style>
