<template>
  <div>
    <!-- <v-row>
      <v-col cols="8" class="purple lighten-3">
        <div class="d-flex justify-space-between">
          <h1>Shopping Cart</h1>
          <h1>3 Items</h1>
        </div>
      </v-col>
      <v-col cols="4" class="green lighten-3">
        <h1>Order Summary</h1>
      </v-col>
    </v-row> -->
    <v-data-table
      dense
      :headers="headers"
      :items="mergedOrders"
      item-key="name"
      class="elevation-1 ma-6"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderData: [],
      productOrderData: [],
      headers: [
        { text: "Product Name", value: "productName" },
        { text: "Price", value: "price" },
        { text: "Order Amount", value: "amount" },
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
    // รวมข้อมูล orders กับ productName จาก products
    mergedOrders() {
      return this.orderData.map((order) => {
        // หาข้อมูล product ที่ตรงกับ productId ของ order
        const product = this.productOrderData.find(
          (p) => p._id === order.productId
        );
        return {
          ...order,
          productName: product ? product.productName : "Unknown",
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
  },
};
</script>

<style></style>
