<template>
  <v-container fluid>
    <v-layout
      justify-center
      align-center>
      <v-flex
        xs12
        sm10
        md8
        lg6
        xl6>
        <v-container align="center">
          <h3 class="text-xs-center">{{ hey }}</h3>
          <h1 class="font-enforce">Home</h1>
          <p>This page uses the default layout which is a Vue component with a sidebar</p>
          <p>API Response: {{ apiData }}</p>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import vueniverseLogo from '~/assets/img/vueniverse_logo.svg'
export default {
  auth: false,
  async asyncData ({ app }) {
    const hey = await app.$axios.$get("/api")
    return { hey }
  },
  head () {
    return {
      title: "Home Page Meta Title",
      description: "I am a description",
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        },
        {
          name: "og:title",
          content: "OG Title"
        }
      ]
    }
  },
  data () {
    return {
      apiData: "Calling API..."
    }
  },
  mounted () {
    this.fetchSomething()
  },
  methods: {
    async fetchSomething () {
      const data = await this.$axios.$get("/api/users")
      this.apiData = data
    }
  }
}
</script>
