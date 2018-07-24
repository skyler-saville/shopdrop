<template>
  <v-app>
    <div id='logo-row' class="row">
      <div class="col s4"></div>
      <div class="col s4">
        <img class='responsive-img' src="~/assets/img/logo.png" alt="Logo">
        </div>
      <div class="col s4"></div>
    </div>
    <div class="row">
      <div id='coming' class="col s12 shop-blue--text">This site is coming soon</div>
    </div>
  </v-app>
</template>

<script>
export default {
  
}
</script>

<style>
#coming {
  font-size: 20pt;
  font-weight: 700;
}
#logo-row {
  margin-top: 3em;
}
</style>
