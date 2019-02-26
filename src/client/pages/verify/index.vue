<template>
  <v-container
    fluid
    fill-height
    class="signin-bg">
    <v-layout
      align-center
      justify-center>
      <v-flex
        xs12
        sm8
        md4>
        <v-card
          class="elevation-10">
          <v-card-text>
            <div class="display-2"> Verification {{ verificationMessage ? "success" : "failed" }}.
            You will be redirected to Sign In in {{ timerCountdown }} seconds.
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex"

export default {
  auth: false,
  layout: "noFooterTransparentNav",
  middleware: ["guest-only"],
  async fetch ({ app, store, redirect, route }) {
    try {
      if (route.query.i === undefined) {
        app.store.dispatch("setupSnackbar", {
          show: true,
          text: "Verification failed. Request for resend verification email.",
          type: "error"
        })
        app.store.dispatch("setVerificationMessage", false)
      }
      else {
        await app.$axios.$post("/api/auth/verify", { i: route.query.i })
        app.store.dispatch("setupSnackbar", {
          show: true,
          text: "Verification successful.",
          type: "success"
        })
        app.store.dispatch("setVerificationMessage", true)
      }
    }
    catch (err) {
      let text = "Verification failed. Request for resend verification email."
      if (err.response.status === 403) {
        text = "Your account already verified."
      }
      if (err.response.status === 401) {
        text = "Link invalid/expired. Request for resend verification email."
      }
      app.store.dispatch("setupSnackbar", {
        show: true,
        text,
        type: "error"
      })
      app.store.dispatch("setVerificationMessage", false)
    }
  },
  data () {
    return {
      timerCountdown: 5
    }
  },
  computed: {
    ...mapState({
      verificationMessage: state => state.verificationMessage
    }),
    verificationResult () {
      if (this.verificationMessage) {
        return "Verification success."
      }
      return "Verification failed."
    }
  },
  mounted () {
    setTimeout(() => {
      this.$nuxt.$router.push({ name: `signin___${this.$i18n.locale}` })
    }, 5000)
    setInterval(() => {
      this.timerCountdown--
    }, 5000)
  }
}
</script>

<style>

</style>
