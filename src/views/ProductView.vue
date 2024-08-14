<template>
  <div>
    <!-- <h1 class="text-center">Shopping Mall</h1> -->
    <!-- <v-carousel hide-delimiter-background height="100vh">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        class="custom-img"
      ></v-carousel-item>
    </v-carousel> -->
    <div class="ma-6">
      <h1 class="text-uppercase text-center my-8 text-h1">jewelry</h1>
      <v-btn
        color="success"
        fab
        @click="newItem()"
        style="position: fixed; right: 20px; bottom: 20px; z-index: 1"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
      <h2 class="text-uppercase text-center my-8">Feature</h2>

      <v-tabs class="d-flex justify-center align-center">
        <v-tab>Best Seller</v-tab>
        <v-tab>Trending</v-tab>
        <v-tab>New</v-tab>
      </v-tabs>
    </div>
    <div class="ma-3">
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
        </v-slide-item>
      </v-slide-group>
    </div>
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
export default {
  data() {
    return {
      productImg: [],
      selection: 0,
      dialogedit: false,
      dialogCart: false,
      items: [
        {
          src: "https://cdn.pixabay.com/photo/2017/01/16/14/17/make-up-1984115_1280.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2018/01/14/00/05/makeup-3081015_1280.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2017/10/03/12/07/bottle-2812214_640.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2020/10/10/18/02/makeup-5643868_1280.jpg",
        },
      ],
      products: [
        {
          productName: "Perfectly poised Hoops",
          price: "$99.00",
          img: "https://i.pinimg.com/236x/90/5a/02/905a0268abf815aef92a309201823b6b.jpg",
        },
        {
          productName: "Lipstick",
          price: "$200.00",
          img: "https://i.pinimg.com/736x/dd/fb/56/ddfb56db35abccd5e96e7d0b6dee3f07.jpg",
        },
        {
          productName: "Lipstick",
          price: "$99.00",
          img: "https://i.pinimg.com/474x/c5/5b/56/c55b56de6c9283417b0d51fc7e615b02.jpg",
        },
        {
          productName: "Lipstick",
          price: "$99.00",
          img: "https://cdn.pixabay.com/photo/2016/07/21/05/52/lipstick-1531929_640.jpg",
        },
        {
          productName: "Lipstick",
          price: "$99.00",
          img: "https://cdn.pixabay.com/photo/2016/07/21/05/52/lipstick-1531929_640.jpg",
        },
      ],
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
    this.setToken();
    if (localStorage.getItem("Token") != undefined) {
      this.getData();
    }
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
    setToken() {
      localStorage.setItem(
        "Token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjMzMDk1ZmE0YWNiMWE0ZmM3YzBhZSIsInVzZXJuYW1lIjoiYWEiLCJhcHByb3ZlIjoiYXBwcm92ZSIsImlhdCI6MTcyMzU1NDQ3OH0.numvFZEigzX4KmeIqBtP1YmrYSw3QilLlHLTF9m-7is"
      );
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
