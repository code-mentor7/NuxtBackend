<template>
  <v-app :dark="isDarkTheme">
    <confirm-action-dialog ref="confirm"/>
    <top-nav v-if="user" />
    <v-content app>
      <snackbar />
      <nuxt/>
    </v-content>
    <bottom-footer />
  </v-app>
</template>

<script>
import { mapState } from "vuex"

import BottomFooter from "~/components/BottomFooter.vue"
import ConfirmActionDialog from "~/components/Dialog/ConfirmActionDialog.vue"
import Snackbar from "~/components/Snackbar.vue"
import TopNav from "~/components/TopNav.vue"

export default {
  components: {
    BottomFooter,
    ConfirmActionDialog,
    Snackbar,
    TopNav
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    isDarkTheme () {
      if (this.user) return this.user.dark_theme
      return true
    }
  },
  mounted () {
    this.$root.$confirm = this.$refs.confirm.open
  }

}
</script>
<style>
.blue-gradient {
  background: linear-gradient(to right, #2a9afc 0%, #00cbfe 100%);
}
</style>
