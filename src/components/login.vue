<template>
  <div class="margin-sheet">
    <v-sheet color="white" rounded elevation="14" width="800" height="500">
      <v-row>
        <v-col>
          <div class="d-flex justify-center">
            <v-img
              src="https://cdn.pixabay.com/photo/2024/08/11/12/28/ai-generated-8961235_640.jpg"
              style="object-fit: cover"
              height="500px"
              width="auto"
              class="d-flex justify-center align-center"
            />
          </div>
        </v-col>
        <v-col>
          <div class="pa-6">
            <h1 class="text-center">Sign in</h1>
            <div style="padding: 3rem 0">
              <h3>Username</h3>
              <v-text-field
                v-model="loginData.username"
                outlined
                :rules="[rules.required]"
                :style="{ borderColor: 'red' }"
              />
              <h3>Password</h3>
              <v-text-field
                v-model="loginData.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                hint="At least 8 characters"
                counter
                outlined
                @click:append="show1 = !show1"
              ></v-text-field>
            </div>
            <v-btn color="info" width="100%" large @click="login">
              Sign in
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus";

export default {
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
      token: "",
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 4 || "Min 4 characters",
      },
    };
  },
  methods: {
    async login() {
      if (
        this.loginData.username.trim() !== "" &&
        this.loginData.password.trim() !== ""
      ) {
        // console.log(this.loginData);
        try {
          const { data } = await this.axios.post(
            "http://localhost:3000/api/v1/login",
            this.loginData
          );

          this.token = data.data.token;
          localStorage.setItem("Token", this.token);

          EventBus.$emit("token", this.token);
          //alert("Login successful");
          this.$router.push({ name: "products" });
        } catch (error) {
          console.log(error);
          alert("Error occurred during login.");
        }
      } else {
        alert("Can't login. Username or password is missing.");
      }
    },
    setToken() {
      localStorage.setItem(
        "Token",
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjMzMDk1ZmE0YWNiMWE0ZmM3YzBhZSIsInVzZXJuYW1lIjoiYWEiLCJhcHByb3ZlIjoiYXBwcm92ZSIsImlhdCI6MTcyMzU1NDQ3OH0.numvFZEigzX4KmeIqBtP1YmrYSw3QilLlHLTF9m-7is"
        this.token
      );
    },
  },
};
</script>

<style>
.v-text-field {
  border-width: 2px;
}

.margin-sheet {
  display: flex;
  justify-content: center; /* จัดกึ่งกลางในแนวนอน */
  align-items: center; /* จัดกึ่งกลางในแนวตั้ง */
  padding: 20px;
  min-height: 100vh; /* ครอบคลุมความสูงทั้งหมดของหน้าจอ */
  box-sizing: border-box; /* ทำให้ padding รวมกับขนาด element */
}
</style>
