<template>
  <div>
    <v-row>
      <v-col cols="8">
        <div class="d-flex justify-space-between pa-6">
          <h1>Shopping Cart</h1>
          <h1>{{ orderItem }} Items</h1>
        </div>
        <v-divider style="color: black; height: 20px"></v-divider>
      </v-col>
      <v-col cols="4">
        <div class="pa-6">
          <!-- <h1>Order Summary</h1> -->
        </div>
        <!-- <v-divider></v-divider> -->
      </v-col>
    </v-row>

    <v-simple-table class="ma-6">
      <template v-slot:default>
        <thead>
          <tr>
            <!-- ใช้ v-for เพื่อสร้างหัวตารางจาก headers -->
            <th v-for="header in headers" :key="header.value">
              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in mergedOrders" :key="item._id">
            <!-- แสดงข้อมูลของแต่ละรายการตาม header ที่กำหนด -->
            <td v-for="header in headers" :key="header.value">
              {{ item[header.value] }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
// import { EventBus } from "@/EventBus";

export default {
  name: "App",
  data() {
    return {
      orderData: [],
      productOrderData: [],
      orderItem: 0,
      headers: [
        { text: "Product Name", value: "productName" },
        // { text: "Product Image", value: "image" },
        { text: "Price", value: "price" },
        { text: "Order Amount", value: "amount" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.setToken();
    if (localStorage.getItem("Token") != undefined) {
      this.getData();
    }
  },
  computed: {
    mergedOrders() {
      return this.orderData.map((order) => {
        const product = this.productOrderData.find(
          (p) => p._id === order.productId
        );
        return {
          ...order,
          productName: product ? product.productName : "Unknown",
          image: product ? product.image : "",
          ...product,
        };
      });
    },
  },

  methods: {
    setToken() {
      localStorage.setItem(
        "Token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjMzMDk1ZmE0YWNiMWE0ZmM3YzBhZSIsInVzZXJuYW1lIjoiYWEiLCJhcHByb3ZlIjoiYXBwcm92ZSIsImlhdCI6MTcyMzU1NDQ3OH0.numvFZEigzX4KmeIqBtP1YmrYSw3QilLlHLTF9m-7is"
      );
    },
    getData() {
      this.axios
        .get("http://localhost:3000/api/v1/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.orderData = response.data.data;
          this.orderItem = response.data.data.length;
          console.log(this.orderData);
        });
      //get product order
      this.axios
        .get("http://localhost:3000/api/v1/products", {
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
    // mounted() {
    //   EventBus.$on("callOrderData", this.callAlert);
    // },
    // beforeDestroy() {
    //   EventBus.$off("callOrderData", this.callAlert);
    // },
    // editItem(item) {
    //   this.editedIndex = this.desserts.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialog = true;
    // },
    // deleteItem (item) {
    //   this.editedIndex = this.desserts.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialogDelete = true
    // },
  },
};
</script>

<style>
/* .custom-table-text {
  font-size: 40px;
} */
.custom-table-text .v-data-table__item {
  font-size: 40px; /* Adjust item font size */
}
.custom-table-text .v-data-table__header {
  font-size: 40px; /* Adjust header font size */
}
</style>
