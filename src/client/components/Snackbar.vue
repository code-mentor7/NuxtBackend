<template>
  <v-snackbar
    v-model="show"
    :color="$store.state.snackBarType"
    :bottom="yMode === 'bottom'"
    :left="xMode === 'left'"
    :right="xMode === 'right'"
    :timeout="localTimeout"
    :top="yMode === 'top'"
    :multi-line="$vuetify.breakpoint.smAndDown"
  >
    {{ $store.state.snackBarText }}
    <v-btn
      dark
      flat
      @click="closeSnackbar"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";

export default {
  props: ["y", "x", "timeout", "text", "type"],
  data () {
    return {
      yMode: "top",
      xMode: null,
      localTimeout: 6000,
      localColor: "info",
      isShow: false,
      localText: ""
    }
  },
  computed: {
    // ...mapGetters("layout", [
    //   "isSnackbar",
    //   "snackBarText",
    //   "snackBarType",
    // ]),
    show: {
      get () {
        return this.$store.state.isSnackbar
      },
      set () {
        return this.$store.dispatch("setSnackbar", false)
      }
    }
  },
  mounted () {
    this.localColor = this.$store.state.snackBarType
    this.localText = this.$store.state.snackBarText

    if (typeof this.y !== "undefined") {
      this.yMode = this.y
    }

    if (typeof this.timeout !== "undefined") {
      this.localTimeout = this.timeout
    }
  },
  methods: {
    // ...mapActions("layout", [
    //   "setSnackbar",
    // ]),
    closeSnackbar () {
      this.$store.dispatch("setSnackbar", false)
      // this.setSnackbar(false);
    }
  }
}
</script>

<style>

</style>
