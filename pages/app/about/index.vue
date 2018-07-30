<template id="aboutTemplate">
  <div>
    <main-jumbo id="test" />
    <div class="container">
          <content v-html="content"></content>
    </div>

  </div>
  

</template>

<script>
// import marked from 'marked'
import axios from '~/plugins/axios'
// import striptags to remove HTML from strings coming from Tipe.io content
import * as striptags from 'striptags'
import mainJumbo from '~/components/jumbotron/main.vue'

export default {
  layout: 'basic',
  async asyncData () {
    let { data } = await axios.get('/api/content/about')
    return {
      title: data.title,
      content: data.content
    }
  },
  head () {
    return {
      title: striptags(this.title)
    }
  },
  components: {
    mainJumbo
  }
}
</script>

<style scoped>

</style>