<template id="signupTemplate">
<div class='container'>

<v-container grid-list-lg>
  <v-layout row wrap>
    <v-flex sm6>
    <div style="color: green; padding: 3em; background-color: turquoise;" v-html="content"></div>
    </v-flex>
    <v-flex sm6>
    <shopper-reg/>
    </v-flex>
  </v-layout>
</v-container>

</div>

</template>

<script>
// import marked from 'marked'
import axios from '~/plugins/axios'
// import striptags to remove HTML from strings coming from Tipe.io content
import * as striptags from 'striptags'
import shopperReg from '~/components/form/shopper-registration.vue'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/content/signup')
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
    shopperReg
  }
}
</script>

<style scoped>

</style>