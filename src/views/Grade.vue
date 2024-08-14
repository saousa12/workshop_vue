<template>
  <div class="container">
    <v-sheet
      class="pa-3 text-center"
      elevation="6"
      rounded="xl"
      outlined
      width="400"
    >
      <h2 class="py-6">Check your grade</h2>
      <v-spacer></v-spacer>
      <v-text-field
        name="GPA"
        label="GPA"
        id="gpa"
        v-model="gpa"
        clearable
        outlined
        :rules="[rules.required, rules.counter]"
      ></v-text-field>
      <v-btn color="success" @click="check(gpa)">Click</v-btn>
    </v-sheet>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="text-center">
        <p class="pt-5 text-center text-h3">Your grade is</p>
        <p class="text-center text-h2">{{ gradeMessage }}</p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gpa: 0,
      dialog: false,
      gradeMessage: "",
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => (value >= 0 && value <= 100) || "0 - 100",
      },
    };
  },
  methods: {
    check(gpa) {
      //   alert(gpa);
      this.dialog = true;
      try {
        if (gpa >= 80 && gpa <= 100) {
          this.gradeMessage = "A";
        } else if (gpa >= 70 && gpa < 80) {
          this.gradeMessage = "B";
        } else if (gpa >= 60 && gpa < 70) {
          this.gradeMessage = "C";
        } else if (gpa >= 50 && gpa < 60) {
          this.gradeMessage = "D";
        } else if (gpa >= 0 && gpa < 50) {
          this.gradeMessage = "F";
        } else {
          this.gradeMessage = "...";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.bg-img {
  background-image: url("https://i.pinimg.com/564x/be/ca/b3/becab3a91a7901c5fdfe69eadba25981.jpg");
  object-fit: contain;
  background-repeat: repeat;
}
</style>
