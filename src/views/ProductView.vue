<template>
  <div>
    <div class="ma-6">
      <h1 class="text-uppercase text-center my-8 text-h1">jewelry</h1>

      <!-- <h2 class="text-uppercase text-center my-8">Feature</h2> -->

      <!-- <v-tabs class="d-flex justify-center align-center">
        <v-tab>Best Seller</v-tab>
        <v-tab>Trending</v-tab>
        <v-tab>New</v-tab>
      </v-tabs> -->
    </div>

    <div class="ma-8">
      <div>
        <h2 class="text-uppercase text-center my-8">Our Products</h2>

        <v-tabs class="d-flex justify-center align-center my-8">
          <v-tab>All</v-tab>
          <v-tab>Earrings</v-tab>
          <v-tab>Necklaces</v-tab>
          <v-tab>Rings</v-tab>
          <v-tab>Hats</v-tab>
          <v-tab>Sunglasses</v-tab>
        </v-tabs>
      </div>

      <div>
        <v-row>
          <v-col cols="3" v-for="(item, index) in productData" :key="index">
            <v-card
              class="ma-4 text-h5 custom-img d-flex flex-column"
              height="500"
              width="400"
              @click="goToProductDetail(item._id)"
            >
              <v-img :src="item.image" height="300" />
              <v-card-title>{{ item.productName }}</v-card-title>

              <v-card-subtitle v-if="item.stock === 0">
                <span>{{ item.price }} ฿ Sold Out</span>
              </v-card-subtitle>
              <v-card-subtitle v-else>
                {{ item.price }} ฿ stock: {{ item.stock }}
              </v-card-subtitle>

              <div class="flex-grow-1"></div>

              <!-- <v-card-actions class="d-flex justify-end">
                <v-btn
                  text
                  color="success"
                  class="align-center"
                  @click.stop="editItem(item)"
                  >Edit</v-btn
                >

                <v-btn
                  text
                  color="error"
                  class="align-center"
                  @click.stop="deleteItem(item)"
                  >Delete</v-btn
                >
              </v-card-actions> -->
            </v-card>
          </v-col>
        </v-row>
        <Band />
      </div>
    </div>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus";
import Band from "../components/band.vue";
export default {
  comments: {
    Band,
  },
  data() {
    return {
      token: "",
      selection: 0,

      productData: [],
    };
  },
  created() {
    EventBus.$on("token", (token) => {
      this.token = token;
      console.log("Received token:", token);
    });

    // if (localStorage.getItem("Token") != undefined) {
    this.getData();
    // }
  },

  methods: {
    goToProductDetail(productId) {
      this.$router.push({ name: "productid", params: { id: productId } });
    },

    async getData() {
      this.axios
        .get("http://localhost:3000/api/v1/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.productData = response.data.data;
          // console.log(this.productData);
        });
    },
  },
  beforeDestroy() {
    // อย่าลืมหยุดฟังเหตุการณ์เมื่อ component ถูกทำลาย
    EventBus.$off("token");
  },
};
</script>

<style>
.custom-img {
  object-fit: contain;
}
</style>
