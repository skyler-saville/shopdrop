<template id="image-testTemplate">
<div class="container">
  <div class="row">
    <div class="col s6 red">{{ content }}</div>
    <img class="col s6 responsive-img" :src="url" alt="">
  </div>
  
</div>

</template>

<script>
// import marked from 'marked'
import axios from '~/plugins/axios'
// import striptags to remove HTML from strings coming from Tipe.io content
// import * as striptags from 'striptags'

export default {
  layout: 'dashboard',
  async asyncData () {
    let { data } = await axios.get('/api/content/image_test')
    return {
      url: data.url,
      content: 'Blah blah blah blah'
    }
  },
  head () {
    return {
      title: 'this is a test image file'
    }
  }
}
</script>

<style scoped>

</style>
