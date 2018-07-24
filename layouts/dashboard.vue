<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <img id="logo" src="~/assets/img/logo.png" alt="" class="responsive-img">
        <!-- view orders -->
        <v-list-tile @click="test">
          <v-list-tile-action>
            <v-icon>account_box</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Account</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- new order -->
        <v-list-tile @click="test">
          <v-list-tile-action>
            <v-icon>note_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>New Order</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- new order -->
        <v-list-tile @click="test">
          <v-list-tile-action>
            <v-icon>view_list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Current Orders</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- new order -->
        <v-list-tile @click="test">
          <v-list-tile-action>
            <v-icon>note_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>New Order</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- new order -->
        <v-list-tile @click="test">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Info</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- new order -->
        <v-list-tile @click="test">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Account Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Welcome back, {{ user }}!</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            
            
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy;{{year}} — <strong>ShopDrop</strong> All Rights Reserved.</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: true,
      user: 'Skyler',
      year: (new Date()).getFullYear()
    }),
    props: {
      source: String
    },
    methods: {
      test: function () {
        alert('this is a test')
      }
    }
  }
</script>

<style scoped>
img#logo {
  padding: 1.5em;
}
</style>
