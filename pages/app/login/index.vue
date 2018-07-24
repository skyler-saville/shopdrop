<template id="loginTemplate">

<div style="color: green; padding: 3em; background-color: turquoise;" v-html="content"></div>

</template>

<script>
// import marked from 'marked'
import axios from '~/plugins/axios'
// import striptags to remove HTML from strings coming from Tipe.io content
import * as striptags from 'striptags'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/content/login')
    return {
      title: data.title,
      content: data.content
    }
  },
  head () {
    return {
      title: striptags(this.title)
    }
  }
}
</script>

<style scoped>

</style>