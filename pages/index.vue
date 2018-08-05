<template>
<!-- Basic Page (no header or footer) -->
  <v-app class="container">
    <div id='logo-row' class="row">
      <div class="col s4"></div>
      <div class="col s4">
        <img class='responsive-img' src="~/assets/img/logo.png" alt="Logo">
        </div>
      <div class="col s4"></div>
    </div>
    <div class="row">
      <div id='coming' class="col s12 shop-blue--text">This site is coming soon...</div>
      <div class="col s12">
        <v-icon
          x-large
          color="green accent-4"
        >
        
        </v-icon>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  transition: 'test',
  layout: 'coming-soon'
}
</script>

<style scoped>
div#coming {
    font-size: 20pt;
    font-weight: 600;
}
#logo-row {
  margin-top: 3em;
}
</style>
