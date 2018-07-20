<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Locations
    </h1>
    <ul class="locations">
      <li v-for="(location, index) in locations" :key="index" class="location">
        <nuxt-link :to="{ name: 'id', params: { id: index }}">
          {{ location.name }} in {{ location.address.city }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/locations')
    return { locations: data }
  },
  head () {
    return {
      title: 'Location'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.locations
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.location
{
  margin: 10px 0;
}
</style>