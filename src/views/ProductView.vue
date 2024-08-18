<template>
  <div>
    <div class="ma-6">
      <h1 class="text-uppercase text-center my-8 text-h1">jewelry</h1>
      <v-btn
        color="success"
        fab
        @click="newItem()"
        style="position: fixed; right: 20px; bottom: 20px; z-index: 1"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
      <!-- <h2 class="text-uppercase text-center my-8">Feature</h2> -->

      <!-- <v-tabs class="d-flex justify-center align-center">
        <v-tab>Best Seller</v-tab>
        <v-tab>Trending</v-tab>
        <v-tab>New</v-tab>
      </v-tabs> -->
    </div>

    <div class="ma-8">
      <h2 class="text-uppercase text-center my-8">Our Products</h2>

      <v-tabs class="d-flex justify-center align-center my-8">
        <v-tab>All</v-tab>
        <v-tab>Earrings</v-tab>
        <v-tab>Necklaces</v-tab>
        <v-tab>Rings</v-tab>
        <v-tab>Hats</v-tab>
        <v-tab>Sunglasses</v-tab>
      </v-tabs>
      <div>
        <v-row>
          <v-col cols="3" v-for="(item, index) in productData" :key="index">
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

              <!-- Adding flex-grow-1 to ensure this section takes up remaining space -->
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
                <!-- <v-btn text color="info" class="align-center" href="/id">Detail</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-dialog v-model="dialogedit" max-width="500px">
      <v-card>
        <v-card-title primary-title> {{ savemode }} </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                name="productName"
                label="productName"
                id="id"
                v-model="postdata.productName"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="category"
                label="category"
                id="id"
                v-model="postdata.category"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="price"
                label="price"
                id="id"
                v-model="postdata.price"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="stock"
                label="stock"
                id="id"
                v-model="postdata.stock"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                name="description"
                label="description"
                id="id"
                v-model="postdata.description"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <!-- <v-file-input
                accept="image/*"
                label="File input"
                v-model="postdata.image"
              ></v-file-input> -->
              <v-text-field
                name="image"
                label="image"
                id="id"
                v-model="postdata.image"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="closeItem()">cancel</v-btn>
          <v-btn text color="info" @click="saveSelect()">save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogCart" max-width="500px">
      <v-card>
        <v-card-title primary-title> Add to cart </v-card-title>
        <div class="pa-3">
          <v-row>
            <v-col cols="8">
              <p class="text-h5 text-black">{{ postOrder.productName }}</p>
              <p class="text-subtitle-1 text-black">
                Price : {{ postOrder.price }}
              </p>
              <p class="text-subtitle-1 text-black">
                Stock : {{ postOrder.stock }}
              </p>
              <v-text-field
                v-model="postOrder.amount"
                name="amount"
                label="amount"
                type="number"
              />
            </v-col>
            <v-col cols="4">
              <v-img :src="postOrder.image" alt="Product Image" contain></v-img>
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
import { EventBus } from "@/EventBus";
export default {
  data() {
    return {
      token: "",
      selection: 0,
      dialogedit: false,
      dialogCart: false,
      productData: [],
      productOrderData: [],
      postdata: {
        productName: "",
        image: "",
        category: "",
        description: "",
        price: 0,
        stock: 0,
        createdBy: "",
      },
      postOrder: {
        amount: 0,
      },
      postdefault: {
        productName: "",
        image: "",
        category: "",
        description: "",
        price: 0,
        stock: 0,
        createdBy: "",
      },
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
  beforeDestroy() {
    // อย่าลืมหยุดฟังเหตุการณ์เมื่อ component ถูกทำลาย
    EventBus.$off("token");
  },
  computed: {
    savemode() {
      return this.id == "" ? "New Item" : "Edit Item";
    },
  },
  methods: {
    newItem() {
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialogedit = true;
    },
    editItem(item) {
      this.id = item._id;
      this.postdata = { ...item };
      this.dialogedit = true;
    },
    closeItem() {
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialogedit = false;
      this.dialogCart = false;
    },
    newOrder(item) {
      console.log(item);
      this.id = item._id;
      this.postOrder = { ...item };

      this.dialogCart = true;
    },
    saveSelect() {
      if (this.id != "") {
        this.savePutData();
      } else {
        this.savePostData();
      }
    },
    saveOrder() {
      if (this.id != "") {
        this.savePostOrder();
        console.log(this.postOrder);
      } else {
        // this.savePostData();
      }
    },
    getData() {
      this.axios
        .get("http://localhost:3000/api/v1/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.productData = response.data.data;
          console.log(this.productData);
        });
      //orders
      this.axios
        .get("http://localhost:3000/api/v1/products/" + this.id + "/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.productOrderData = response.data.data;
          console.log(this.productOrderData);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async savePostData() {
      try {
        const { data } = await this.axios.post(
          "http://localhost:3000/api/v1/products",
          this.postdata,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        console.log(data);
        alert("Create Complete");
        this.getData();
        this.closeItem();
      } catch (error) {
        console.log(error);
        alert("Error จ้า");
      }
    },
    async savePutData() {
      try {
        const { data } = await this.axios.put(
          "http://localhost:3000/api/v1/products/" + this.id,
          // { approve: true },
          this.postdata,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        console.log(data);
        alert("Update Complete");
        this.getData();
        this.closeItem();
      } catch (error) {
        console.log(error);
        alert("Error จ้า");
      }
    },
    async deleteItem(item) {
      if (confirm("delete " + item.productName)) {
        try {
          const { data } = await this.axios.delete(
            "http://localhost:3000/api/v1/products/" + item._id,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
              },
            }
          );
          console.log(data);
          alert("Delete Complete");
          this.getData();
          this.closeItem();
        } catch (error) {
          console.log(error);
          alert("Error จ้า");
        }
      }
    },
    async savePostOrder() {
      try {
        const { data } = await this.axios.post(
          "http://localhost:3000/api/v1/products/" + this.id + "/orders",
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
  },
};
</script>

<style>
.custom-img {
  object-fit: contain;
}
</style>
