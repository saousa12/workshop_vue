<template>
  <div>
    <h1>component zone</h1>
    <h1>{{ name }}</h1>
    <v-btn color="success" @click="callMain()">callMain</v-btn>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus";
export default {
  props: ["name"],
  methods: {
    callMain() {
      //   this.$emit("callAlert");
      EventBus.$emit("callAlertParam", "ปลา");
    },
  },
};
</script>

<style></style>
