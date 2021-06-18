<template>
  <div id="modifyUser">
    <h2>Modifiez votre publication</h2>
    <form @submit.prevent="modifyUser(User[0].id)">
      <div>
        <label for="name">Nom</label>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Titre"
          v-model="User[0].name"
          @input="User.name"
        />
      </div>
      <div>
        <label for="surname">Prénom</label>
        <br />
        <input
          type="text"
          name="surname"
          placeholder="surname"
          v-model="User[0].surname"
          @input="User.surname"
        />
      </div>
      <div>
        <label for="email">Email</label>
        <br />
        <input
          type="email"
          name="email"
          v-model="User[0].email"
          @input="User.email"
          placeholder="Email"
        />
      </div>
      <div>
        <label for="rights">Droits</label>
        <br />
        <input
          type="rights"
          name="rights"
          v-model="User[0].rights"
          @input="User.rights"
          placeholder="rights"
        />
      </div>
      <div>
        <button type="submit" class="button">Envoyer</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

#creaUser {
  background: #c1d3fe;
  max-width: fit-content;
  margin: auto;
  border-radius: 1rem;
  box-shadow: 1px 1px 5px #6b705c;
  color: #343534;
}

div {
  padding: 1rem;
}

.button {
  transition-duration: 0.4s;
  background-color: #edf2fb;
  color: black;
  border: 1px solid #abc4ff;
  border-radius: 0.2rem;
  padding: 0.5rem;
}

.button:hover {
  background-color: #abc4ff;
  color: black;
}
</style>

<script>
import axios from "axios";

const token = localStorage.getItem("jwt");
let id;

export default {
  name: "modifyUser",
  data() {
    return {
      User: {
        id: "",
        name: "",
        surname: "",
        email: "",
        password: "",
        rights: "",
      },
    };
  },
  methods: {
    modifyUser(id) {
      axios
        .put("http://localhost:5000/api/admin/users/" + id, this.User[0], {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          this.$router.push("/administration");
          alert("Votre Utilisateur a été modifié avec succès.");
        })
        .catch((error) => {
          alert(
            "Erreur lors de la modification :" +
              " " +
              error.response.data.message
          );
        });
    },
    getId() {
      id = this.$route.params.id;
    },
    getUser(id) {
      axios
        .get("http://localhost:5000/api/admin/users/" + id, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          this.User = response.data;
        });
    },
  },
  beforeMount() {
    this.getId();
    this.getUser(id);
  },

  computed: {},
};
</script>
