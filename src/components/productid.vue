<template>
  <div>
    <div v-if="productData">
      <v-row style="padding: 5%">
        <v-col cols="6">
          <v-img :src="productData.image" class="custom-image" />
        </v-col>
        <v-col cols="6" class="d-flex flex-column">
          <div>
            <h2>{{ productData.productName }}</h2>
            <p>{{ productData.price }} ฿</p>
            <p :style="{ color: productData.stock === 0 ? 'red' : 'black' }">
              Stock:
              {{ productData.stock === 0 ? "Sold Out" : productData.stock }}
            </p>
            <h3 style="text-wrap: pretty">{{ productData.description }}</h3>
          </div>
          <div class="text-center" style="margin-top: auto">
            <v-btn outlined color="ิblack" @click="dialogCart = true"
              >Add to Cart</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <p>Loading productData details...</p>
    </div>
    <v-dialog v-model="dialogCart" max-width="500px">
      <v-card>
        <v-card-title primary-title> Add to cart </v-card-title>
        <div style="padding: 20px">
          <v-row>
            <v-col cols="8">
              <p class="text-h5 text-black">{{ productData.productName }}</p>
              <p class="text-subtitle-1 text-black">
                Price : {{ productData.price }}
              </p>
              <p class="text-subtitle-1 text-black">
                Stock : {{ productData.stock }}
              </p>

              <div class="d-flex flex-row" style="width: 200px">
                <v-btn icon @click="updateAmount(1)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>

                <v-text-field
                  v-model="postOrder.amount"
                  name="amount"
                  type="number"
                  id="id"
                />

                <v-btn icon @click="updateAmount(-1)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="4">
              <v-img
                :src="productData.image"
                alt="Product Image"
                contain
              ></v-img>
            </v-col>
          </v-row>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="closeItem()">cancel</v-btn>
          <v-btn text color="info" @click="saveOrder()">save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productData: [],
      dialogCart: false,
      postOrder: {
        amount: 1,
        total: 1,
      },
    };
  },
  created() {
    this.getData();
    this.postOrder.amount = 1;
  },
  methods: {
    updateAmount(value) {
      const newAmount = this.postOrder.amount + value;

      if (newAmount >= 1) {
        this.postOrder.amount = newAmount;
      }
    },
    saveOrder() {
      if (this.id != "") {
        this.postOrder.total = this.postOrder.total * this.postOrder.amount;
        this.savePostOrder();
        // console.log("save order", this.postOrder);
      }
    },
    closeItem() {
      this.id = "";
      this.dialogCart = false;
    },
    async savePostOrder() {
      const productId = this.$route.params.id;

      try {
        const { data } = await this.axios.post(
          "http://localhost:3000/api/v1/products/" + productId + "/orders",
          this.postOrder,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        console.log(data);
        alert("Create order Complete");
        this.getData();
        this.closeItem();
      } catch (error) {
        console.log(error);
        alert("Error จ้า");
      }
    },

    getData() {
      const productId = this.$route.params.id;
      // console.log("Product ID from route:", productId);

      this.axios
        .get("http://localhost:3000/api/v1/products/" + productId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          this.productData = response.data.data;
          this.postOrder.total = this.productData.price;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });

      //orders
      // this.axios
      //   .get("http://localhost:3000/api/v1/products/" + this.id + "/orders", {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("Token")}`,
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //     this.productOrderData = response.data.data;
      //     console.log(this.productOrderData);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      // this.postOrder.total = this.productData.price
    },
  },
};
</script>
<style>
.custom-image {
  height: 400px;
}
</style>
