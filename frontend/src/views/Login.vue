<template>
  <div id="login">
    <h2>Login</h2>
    <form @submit.prevent="loginUser" id="login-form">
      <div>
        <label for="email">Adresse mail</label>
        <br />
        <input
          id="email"
          type="email"
          placeholder="Adresse mail"
          v-model="form.email"
          required
          autofocus
        />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <br />
        <input
          id="password"
          type="password"
          placeholder="Mot de passe"
          v-model="form.password"
          required
        />
      </div>
      <div>
        <button type="submit" class="button">Se connecter</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

#login {
  margin-top: -5rem;
}

div {
  padding: 1rem;
}

.button {
  transition-duration: 0.4s;
  background-color: #e7e7e7;
  color: black;
  border: 1px solid #3d6098;
  border-radius: 0.2rem;
  padding: 0.5rem;
}

.button:hover {
  background-color: #3d6098;
  color: white;
}
</style>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
        loginUser() {
      axios.post("http://localhost:5000/api/login", this.form).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.surname));
        localStorage.setItem("username", JSON.stringify(res.data.username));
        localStorage.setItem("userId", JSON.stringify(res.data.userId));
        localStorage.setItem(
          "user_rights",
          JSON.stringify(res.data.rights)
        );
        localStorage.setItem("jwt", res.data.token);
        if (localStorage.getItem("jwt") != null) {
            this.$emit("loggedIn");
            if (this.$route.params.nextUrl != null) {
              this.$router.go(this.$route.params.nextUrl);
            } else {
              this.$router.go("/");
            }
          } else {
            alert("pb localstorage")
          }
        })
        .catch((error) => {
          alert(error.res.data.message);
      });
    },
  }
};
</script>