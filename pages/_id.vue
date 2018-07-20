<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Locations
    </h1>
    <h2 class="info">
      {{ location.name }}
    </h2>
    <nuxt-link class="button" to="/">
      Locations
    </nuxt-link>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'id',
  asyncData ({ params, error }) {
    return axios.get('/api/locations/' + params.id)
      .then((res) => {
        return { location: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Location not found' })
      })
  },
  head () {
    return {
      title: `Location: ${this.location.name}`
    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
