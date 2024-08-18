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

      <v-btn href="/orders" text>
        <v-icon style="transform: scaleX(-1)">mdi-cart-outline </v-icon>
        <h3>
          {{ amountOrder }}
        </h3>
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
        <v-list-item :to="{ name: 'me' }">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'grade' }">
          <v-list-item-title>Grade</v-list-item-title>
        </v-list-item>
        <v-list-item @click="setToken">
          <v-list-item-icon>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
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
      amountOrder: 0,
    };
  },
  created() {
    this.User = localStorage.getItem("User");
    console.log(this.User);
    this.getOrder();
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
  methods: {
    setToken() {
      localStorage.removeItem("Token");

      this.$router.push("/login");
    },
    getOrder() {
      //get orders
      this.axios
        .get("http://localhost:3000/api/v1/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          console.log("order", response.data.data.length);
          this.amountOrder = response.data.data.length;
        })
        .catch((error) => {
          console.error(error);
        });
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
