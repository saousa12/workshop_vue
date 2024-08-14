<template>
  <div>
    <h1>Simple page</h1>
    <h1 v-if="show">{{ name }}</h1>
    <v-btn color="success" @click="show = !show">switch</v-btn>
  </div>
</template>

<script>
// import subcom from "../components/Subcom.vue";
import { EventBus } from "@/EventBus";
export default {
  // components: {
  //   subcom,
  // },
  data() {
    return {
      message: "",
      name: "Usa Ousa",
      show: false,
      catlist: [
        {
          name: "koko",
          imglink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX_CFjtjrgOIDzAcmEJIAtjyJ3GIItnoiGzQ&s",
        },
        {
          name: "nemo",
          imglink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFKSZ007TZXqzui55dm_MvRomlR3YeYBog9w&s",
        },
        {
          name: "omo",
          imglink: "https://i.ytimg.com/vi/J4fbjNUTGg4/hqdefault.jpg",
        },
      ],
    };
  },

  methods: {
    callAlert() {
      alert("Husky!!!");
    },
    callAlertParam(item) {
      localStorage.setItem("User", item);
      this.$cookies.set("token", item, "30s");
      this.$cookies.get("token");

      alert(item);
    },
    removeLocal() {
      localStorage.removeItem("User");
      alert("remove complete");
    },
  },
  mounted() {
    EventBus.$on("callAlert", this.callAlert);
    EventBus.$on("callAlertParam", this.callAlertParam);
  },
  beforeDestroy() {
    EventBus.$off("callAlert", this.callAlert);
    EventBus.$off("callAlertParam", this.callAlertParam);
  },
};
</script>

<style></style>
