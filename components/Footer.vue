<template>
  <v-footer
    height="auto"
    class="shop-blue white--text text-md-center"
  >
    <v-card
      flat
      tile
      
    >
      <!-- <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3 white--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text> -->

      <v-card-text class="white--text pt-0">
        <strong>Shop Drop Delivery</strong> is a locally owned business that provides deliveries to Southern Utah families and businesses. We deliver groceries and other household items from any grocery store. This service helps you to have more time to spend with family and friends, more energy to go throughout the day, along with the peace of mind that one of our friendly shoppers will give you the best experience possible. We support individual orders and businesses.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;{{year}} — <strong>ShopDrop</strong> All Rights Reserved.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: function () {
    return {
      year: (new Date()).getFullYear()
    }
  }
  
}
</script>

<style>

</style>
