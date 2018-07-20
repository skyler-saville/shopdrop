<template>
  <section class="container">
    <img src="~assets/img/white-logo.jpg" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      <div v-html="title"></div>
    </h1>
    <section>
      <!-- use v-html only on trusted content (like the content I write in the CMS) -->
      <div v-html="content"></div>
      
    </section>
  </section>
</template>

<script>
// import marked from 'marked'
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/content/home')
    return {
      title: data.title,
      content: data.content
    }
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
