<template id="visitor-mobile-toolbar-template">
<div>
  <v-card
    color="blue"
    flat
  >
    <v-toolbar id="mobile-toolbar" color="white" dark>
      <v-toolbar-title class="menu-height white--text">
        <nuxt-link class="title" to="/app">
          <img id="mobile-toolbar-logo" src="~/assets/img/logo.png" alt="" class="responsive-img">
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer id="spacer"></v-spacer>
      <v-toolbar-side-icon
        color="indigo"
        @click.stop="drawer = !drawer"
      >
      </v-toolbar-side-icon>
    </v-toolbar>
  </v-card>
    <v-layout
    >
  <v-navigation-drawer
      id="mobile-visitor-drawer"
      v-model="drawer"
      absolute
      temporary
      dark
    >
      <v-list class="pa-1">
        <v-list-tile menu>
          <v-list-tile-content>
            <v-list-tile-title>Menu</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          nuxt
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
  </div>
</template>

<script>
  export default {
  data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'home', path: '/app' },
          { title: 'About', icon: 'explore', path: '/app/about' },
          { title: 'Contact', icon: 'call', path: '/app/contact' },
          { title: 'Sign Up', icon: 'supervisor_account', path: '/app/shopper/signup' },
          { title: 'Login', icon: 'how_to_reg', path: '/app/login' }

        ]
      }
    }
  }
</script>
<style scoped>
#mobile-visitor-menu {
  position: relative;
  right: 30em;
}
#mobile-toolbar-logo {
  max-height: 2.5em;
  width: auto;
  margin-top: .5em;
}
#mobile-toolbar {
  height: 5em;
  padding-top: .5em;
}
</style>
