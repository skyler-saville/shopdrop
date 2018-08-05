<template id="homeTemplate">
<div id='outer-page-container'>
  <div id="jumbotron-overlay">
    <v-jumbotron
    dark
    ripple
    height="50em"
    :src="img4.url"
    id='jumbo-content'
    >
      <v-container fill-height >
        <v-layout align-center>
        <v-flex
         text-sm-center
        >
        <h4 class="display-3">ShopDrop Delivery</h4>
        <v-layout>
          <v-flex
            sm10
            offset-sm1
            xs12
          >
            <h4 id="mission" class="title" v-html="mission"></h4>
          </v-flex>
        </v-layout>

        <!-- learn more button -->
        <v-layout>
          <v-flex
          sm2
          offset-sm4
          xs12
          >
          <!-- Sign up button -->
          <v-btn 
            large 
            dark 
            color="blue"
            href="/app/shopper/signup"
          >
            Sign Up!
          </v-btn>
          </v-flex>
          <v-flex
          sm2
          xs12
          >
          <!-- Learn more button -->
          <v-btn 
            large 
            dark 
            color="blue"
            href="/app/about"
          >
            Learn More
          </v-btn>
          </v-flex>
        </v-layout>
        </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </div>
  
  <!-- <v-container>
    <v-layout row wrap>
      <v-flex sm6>
        <img v-if="missionImg" :src="missionImg.url" :alt="missionImg.alt">
      </v-flex>
      <v-flex sm6></v-flex>
    </v-layout>
  </v-container>


<div v-if="content" v-html="content"></div>
<div v-if="mission" v-html="mission"></div>
<div>
  <h1>Images</h1>
   <img v-if="img1" class="responsive-img" :src="img1.url" :alt="img1.alt">
   <img v-if="img2" class="responsive-img" :src="img2.url" :alt="img2.alt">
   <img v-if="img3" class="responsive-img" :src="img3.url" :alt="img3.alt">
   <img v-if="img4" class="responsive-img" :src="img4.url" :alt="img4.alt">
   <img v-if="img5" class="responsive-img" :src="img5.url" :alt="img5.alt">
</div> -->
</div>
  
</template>

<script>
// import marked from 'marked'
import axios from '~/plugins/axios'
// import striptags to remove HTML from strings coming from Tipe.io content
import * as striptags from 'striptags'

export default {
  transition: 'test',
  async asyncData () {
    let { data } = await axios.get('/api/content/home-content')
    return {
      title: data.main.title,
      content: data.main.content,
      mission: data.mission.mission,
      missionImg: data.mission.missionImg,
      img1: data.images.img_1,
      img2: data.images.img_2,
      img3: data.images.img_3,
      img4: data.images.img_4,
      img5: data.images.img_5
    }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>

<style scoped>
.responsive-img {
  width: 100%;
  height: auto;
}
#jumbotron-overlay {
  background-color: rgb(58,71,153);
}

</style>