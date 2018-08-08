<template>
  <div>
    <toolbar class="hidden-sm-and-down"/>
    <toolbar-mobile class="hidden-md-and-up"/>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import Toolbar from '~/components/test/Toolbar.vue'
import ToolbarMobile from '~/components/test/Toolbar-mobile.vue'
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter,
    Toolbar,
    ToolbarMobile
    
  }
}
</script>

<style>
/* most styles come from materialize.css */
</style>