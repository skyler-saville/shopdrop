<template>
  <div>
    <toolbar/>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import Toolbar from '~/components/test/Toolbar.vue'
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter,
    Toolbar
    
  }
}
</script>

<style>
/* most styles come from materialize.css */
</style>