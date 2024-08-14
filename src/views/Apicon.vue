<template>
  <div>
    <h1>Api con page</h1>
    <h1>{{ apidata }}</h1>
    <v-row>
      <v-col cols="12">
        <v-btn color="success" @click="newItem()">newItem</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" v-for="(item, index) in apidata" :key="index">
        <v-card width="300">
          <v-img
            width="300"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSN5kyGXRsJTnCvfM371Ycg8u7k9viw1gW-g&s"
          ></v-img>
          <v-card-title primary-title>
            {{ item.productName }}
            {{ item.category }}
            {{ item.price }}
          </v-card-title>
          <v-card-actions>
            <v-btn color="success" @click="editItem(item)">Edit</v-btn>
            <v-btn color="error" @click="deleteItem(item)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
            <!-- <v-col cols="4">
              <v-text-field
                name="description"
                label="description"
                id="id"
                v-model="postdata.description"
              ></v-text-field>
            </v-col> -->
            <v-col cols="4">
              <v-text-field
                name="price"
                label="price"
                id="id"
                v-model="postdata.price"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                name="stock"
                label="stock"
                id="id"
                v-model="postdata.stock"
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
export default {
  name: "apicon",
  data() {
    return {
      id: "",
      apidata: [],
      dialogedit: false,
      postdata: {
        productName: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        createdBy: "",
      },
      postdefault: {
        productName: "",
        category: "",
        description: "",
        price: "",
        stock: "",
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
    },
    saveSelect() {
      if (this.id != "") {
        this.savePutData();
      } else {
        this.savePostData();
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
          this.apidata = response.data.data;
          console.log(this.apidata);
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
