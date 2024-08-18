<template>
  <div>
    <div>
      <div class="d-flex justify-space-between pa-6">
        <h1>Shopping Cart</h1>
        <h1>{{ orderItem }} Items</h1>
      </div>
      <v-divider style="color: black; height: 20px"></v-divider>
    </div>

    <v-container>
      <v-row>
        <v-col
          v-for="(header, index) in headers"
          :key="index"
          style="background-color: lightskyblue; margin-top: 30px"
        >
          <h3>{{ header.text }}</h3>
        </v-col>
      </v-row>

      <!-- Table Data -->
      <v-row v-for="(order, orderIndex) in mergedOrders" :key="orderIndex">
        <v-col v-for="(header, colIndex) in headers" :key="colIndex">
          <div v-if="header.text === 'Order Amount'">
            <v-btn icon @click="updateAmount(order, 1)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <span>{{ order.amount }}</span>
            <v-btn icon @click="updateAmount(order, -1)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </div>
          <div v-if="header.value === 'actions'">
            <v-btn color="error" class="text-white" @click="deleteItem(order)"
              >Delete</v-btn
            >
          </div>
          <div v-else>
            <h4>{{ order[header.value] }}</h4>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus";

export default {
  name: "App",
  data() {
    return {
      token: "",
      orderData: [],
      productOrderData: [],
      mergedOrders: [],
      orderItem: 0,
      headers: [
        { text: "Order Id", value: "_id" },
        { text: "Product Name", value: "productName" },
        { text: "Price", value: "price" },
        { text: "Order Amount", value: "" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  created() {
    EventBus.$on("token", (token) => {
      this.token = token;
      console.log("Received token:", token);
    });
    this.getData();
  },

  methods: {
    updateAmount(order, amountChange) {
      const newAmount = order.amount + amountChange;
      if (newAmount >= 0) {
        order.amount = newAmount;
        // คุณสามารถทำการอัปเดตเพิ่มเติม เช่น ส่งคำขอไปยัง API เพื่อลบข้อมูล
      }
    },
    async getData() {
      try {
        const ordersResponse = await this.axios.get(
          "http://localhost:3000/api/v1/orders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        const productsResponse = await this.axios.get(
          "http://localhost:3000/api/v1/products",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );

        const orders = ordersResponse.data.data;
        this.orderItem = ordersResponse.data.data.length;
        const products = productsResponse.data.data;

        this.mergedOrders = orders.map((order) => {
          const product = products.find((p) => p._id === order.productId);
          return {
            ...order,
            productName: product ? product.productName : "Unknown",
            price: product.price,
          };
        });
      } catch (error) {
        console.error(error);
      }
    },

    async deleteItem(item) {
      console.log(item);

      if (confirm("delete order " + item.productName)) {
        try {
          await this.axios.delete(
            "http://localhost:3000/api/v1/orders/" + item._id,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
              },
            }
          );
          alert("Delete Complete");
          this.getData();
        } catch (error) {
          console.log(error);
          alert("Error จ้า");
        }
      }
    },
    beforeDestroy() {
      // อย่าลืมหยุดฟังเหตุการณ์เมื่อ component ถูกทำลาย
      EventBus.$off("token");
    },
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
