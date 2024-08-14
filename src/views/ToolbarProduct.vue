<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
        <v-btn href="/products" text>
          <v-icon color="white">mdi-home-variant-outline</v-icon>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="" target="_blank" text>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn href="/orders" text>
        <v-icon style="image-orientation: 180">mdi-cart-outline</v-icon>
      </v-btn>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">{{ User }}</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      User: "",
    };
  },
  created() {
    this.User = localStorage.getItem("User");
    console.log(this.User);
  },
};
</script>
