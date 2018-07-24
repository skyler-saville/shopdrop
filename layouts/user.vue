<template>
  <div>
    <user-header/>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import UserHeader from '~/components/user-header.vue'
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter,
    UserHeader
  }
}
</script>

<style>
/* most styles come from materialize.css */
</style>
