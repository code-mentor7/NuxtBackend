<template>
  <v-app id="inspire">
    <top-nav />
    <v-content app>
      <snackbar />
      <nuxt/>
    </v-content>
    <bottom-footer />
  </v-app>
</template>

<script>

import BottomFooter from "~/components/BottomFooter.vue"
import Snackbar from "~/components/Snackbar.vue"
import TopNav from "~/components/TopNav.vue"

export default {
  components: {
    BottomFooter,
    Snackbar,
    TopNav
  },
  props: {
    source: String
  },
  data () {
    return {
      drawer: null,
      items: [
        {
          action: "android",
          title: "Something",
          items: [
            { title: "First" },
            { title: "Second" },
            { title: "Third" }
          ]
        },
        {
          action: "settings",
          title: "Settings",
          items: [
            { title: "Payment" },
            { title: "Account" },
            { title: "Privacy" }
          ]
        }
      ],
      name: "vueniverse",
      mini: true,
      right: null
    }
  },
  computed: {
    snackbar: {
      get () {
        return this.$store.state.notification.snackbar
      },
      set (value) {
        this.$store.commit("notification/UPDATE_SNACKBAR", value)
      }
    },
    snackbarColor () {
      return "red"
      // return this.$store.state.notification.context
    }
  }
}
</script>
