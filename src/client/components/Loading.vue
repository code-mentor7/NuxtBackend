<template lang="html">
  <!-- <div v-if="loading" class="loading-page">
    <p class="infront">Loading...</p>
  </div> -->
  <v-progress-linear
    v-show="loading"
    :indeterminate="true"
    class="rainbow-gradient progress-bar-top ma-0 px-0 fluid"/>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      // https://vuejsdevelopers.com/2018/07/16/7-tips-large-nuxt-app-vue/
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.progress-bar-top{
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
}
.rainbow-gradient {
    /* https://stackoverflow.com/questions/40557461/rainbow-gradient-on-text-in-css */
    height: 200px;
    background: -moz-linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 25%, rgba(5,193,255,1) 50%, rgba(255,255,0,1) 75%, rgba(255,0,0,1) 100%); /* ff3.6+ */
    background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, rgba(255,0,0,1)), color-stop(25%, rgba(255,255,0,1)), color-stop(50%, rgba(5,193,255,1)), color-stop(75%, rgba(255,255,0,1)), color-stop(100%, rgba(255,0,0,1))); /* safari4+,chrome */
    background: -webkit-linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 25%, rgba(5,193,255,1) 50%, rgba(255,255,0,1) 75%, rgba(255,0,0,1) 100%); /* safari5.1+,chrome10+ */
    background: -o-linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 25%, rgba(5,193,255,1) 50%, rgba(255,255,0,1) 75%, rgba(255,0,0,1) 100%); /* opera 11.10+ */
    background: -ms-linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 25%, rgba(5,193,255,1) 50%, rgba(255,255,0,1) 75%, rgba(255,0,0,1) 100%); /* ie10+ */
    background: linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 25%, rgba(5,193,255,1) 50%, rgba(255,255,0,1) 75%, rgba(255,0,0,1) 100%); /* w3c */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0000', endColorstr='#ff0000',GradientType=1 ); /* ie6-9 */
}
</style>
