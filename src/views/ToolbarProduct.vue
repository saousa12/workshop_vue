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
        <v-btn href="/products" text> Home </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="" target="_blank" text>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn href="/orders" text>
        <v-icon style="transform: scaleX(-1)">mdi-cart-outline</v-icon>
        <!-- <p>{{ orderItem }}</p> -->
      </v-btn>

      <v-btn text @click="select = !select">
        <span class="mr-2">
          <v-avatar color="indigo" size="36">
            <v-icon dark> mdi-account </v-icon>
          </v-avatar>
        </span>
        {{ User }}
      </v-btn>
    </v-app-bar>
    <v-card class="list-item" max-width="300" tile v-if="select">
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {
  name: "App",
  // props: ["orderItem"],
  data() {
    return {
      User: "",
      select: false,
      items: [
        // { text: "Real-Time", icon: "mdi-clock" },
        // { text: "Audience", icon: "mdi-account" },
        { text: "Logout", icon: "mdi-login-variant" },
      ],
    };
  },
  created() {
    this.User = localStorage.getItem("User");
    console.log(this.User);
  },
  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    },
  },
};
</script>
<style>
.list-item {
  position: fixed;
  top: 60px; /* Adjust this value based on your toolbar height */
  right: 0;
  z-index: 1;
  margin-right: auto;
}
</style>
