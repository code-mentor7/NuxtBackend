<template>
  <v-jumbotron>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <h1>Page Not found :(</h1>
          <h4><nuxt-link to="/">
            Back to home
          </nuxt-link></h4>
          <p v-if="isDev">
            {{ message }}
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode () {
      return (this.error && this.error.statusCode) || 500
    },
    message () {
      return this.error.message
    },
    isDev () {
      console.log("### process.env.NODE_ENV", process.env.NODE_ENV)
      return process.env.NODE_ENV === "development"
    }
  }
}
</script>
