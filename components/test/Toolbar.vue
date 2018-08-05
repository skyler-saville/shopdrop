<template>
  <v-toolbar
    prominent
    color="white"
    class="menu-height"
    >
    <v-toolbar-title class="menu-height white--text">
      <nuxt-link class="title" to="/app">
        <img id="toolbar-logo" src="~/assets/img/logo.png" alt="" class="responsive-img">
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer id="spacer"></v-spacer>
    <visitor-buttons/>
    <!-- <v-toolbar-side-icon color="shop-green"></v-toolbar-side-icon> -->
  </v-toolbar>
</template>
<script>
  import visitorButtons from "~/components/test/visitor-buttons"
  export default {
    components: {
      visitorButtons
    }
}
</script>
<style scoped>
.title {
  text-decoration: none !important;
}
.title:visited{
  color: white;
}
#toolbar-logo {
  max-height: 4em;
  position: relative;
  top: 3em;
}
.menu-height, #spacer, .v-toolbar__content {
  height: 8em;
}

</style>