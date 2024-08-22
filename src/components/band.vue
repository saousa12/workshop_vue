<template>
  <!-- band -->
  <div
    style="
      background-image: url('https://i.pinimg.com/564x/27/4d/3b/274d3b7a4ab4a91c9b540ef9a0e95bfe.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      height: 100vh;
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <h1
      style="
        text-transform: uppercase;
        color: black;
        border: 10px solid black;
        padding: 5rem;
        border-radius: 10px; /* Optional: to add rounded corners */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: to add shadow */
      "
    >
      <span class="text-h3"> Sold Out in 24 hours Back In Stock</span>
    </h1>
    <!-- <div class="ma-3">
      <v-slide-group class="pa-4" center-active show-arrows>
        <v-slide-item v-for="(item, index) in productData" :key="index">
          <v-card
            class="ma-4 text-h5 custom-img d-flex flex-column"
            height="500"
            width="400"
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
            <v-card-actions class="d-flex justify-end">
              <v-btn
                text
                color="success"
                class="align-center"
                @click="editItem(item)"
                >Edit</v-btn
              >
              <v-btn
                text
                color="info"
                class="align-center"
                @click="newOrder(item)"
                >Add to Cart</v-btn
              >
              <v-btn
                text
                color="error"
                class="align-center"
                @click="deleteItem(item)"
                >Delete</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </div> -->

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
