<template>
  <div>
    <v-row class="my-2">
      <v-col cols="12" md="6">
        <v-sheet
          color="blue"
          elevation="5"
          height="auto"
          rounded="pill"
          class="pa-3 text-center"
        >
          <p class="text-subtitle-1 text-md-h4">{{ item.title }}</p>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6">
        <v-sheet class="pa-3 blue lighten-4">
          <h3>{{ item.content }}</h3>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
