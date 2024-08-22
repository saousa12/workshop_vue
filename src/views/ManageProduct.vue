<template>
  <div>
    <div style="margin: 5%">
      <v-btn color="info" @click="newItem()"> Add Product</v-btn>
      <!-- <v-btn
        color="success"
        fab
        @click="newItem()"
        style="position: fixed; right: 20px; bottom: 20px; z-index: 1"
        ><v-icon>mdi-plus</v-icon></v-btn
      > -->

      <div style="margin-top: 2%">
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

              <v-card-actions class="d-flex justify-end">
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
  </div>
</template>

<script>
import { EventBus } from "@/EventBus";

export default {
  data() {
    return {
      token: "",
      productData: [],
      dialogedit: false,
      postdata: {
        productName: "",
        image: "",
        category: "",
        description: "",
        price: 0,
        stock: 0,
        createdBy: "",
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
  computed: {
    savemode() {
      return this.id == "" ? "New Item" : "Edit Item";
    },
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
    },
    saveSelect() {
      if (this.id != "") {
        this.savePutData();
      } else {
        this.savePostData();
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
          // console.log(this.productData);
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
  },
};
</script>

<style></style>
