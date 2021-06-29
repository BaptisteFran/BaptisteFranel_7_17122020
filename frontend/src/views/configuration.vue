<template>
  <div id="register">
    <h2>Création de votre compte</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="name">Nom</label>
        <br />
        <input type="text" name="name" placeholder="Name" v-model="form.name" />
      </div>
      <div>
        <label for="name">Prénom</label>
        <br />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          v-model="form.surname"
        />
      </div>
      <div>
        <label for="name">Email</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          v-model="form.email"
        />
      </div>
      <div>
        <label for="name">Mot de passe</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          v-model="form.password"
        />
      </div>
      <div v-if="passwordError" class="error">{{ passwordError }}</div>
      <div class="terms">
        <input type="checkbox" v-model="terms" required />
        <label>Accepter les conditions d'utilisateur</label>
      </div>
      <div><button type="submit" class="button">Register</button></div>
    </form>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background: #e7e7e7;
}

div {
  padding: 1rem;
}

#register {
  margin-top: -5rem;
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

input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 16px 0 0;
  position: relative;
  top: 2px;
}

form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      form: {
        name: "",
        surname: "",
        email: "",
        password: "",
        rights: 1,
      },
      terms: false,
      passwordError: "",
    };
  },
  methods: {
    registerUser() {
      //validate password
      this.passwordError =
        this.form.password.length > 8
          ? ""
          : "Votre mot de passe doit contenir au moins 8 caratères";
      if (!this.passwordError) {
        if (this.terms) {
          axios
            .post("http://localhost:5000/api/register", this.form)
            .then((res) => {
              console.log(res);
              this.$router.push("/");
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
        } else {
          alert("Veuillez accepter les termes");
        }
      }
    },
  },
};
</script>
