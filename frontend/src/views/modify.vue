<template>
  <div id="modifyPost">
    <h2>Modifiez votre publication</h2>
    <form @submit.prevent="modifyPost(post[0].id)">
      <div>
        <label for="title">Titre</label>
        <br />
        <input
          type="text"
          name="title"
          placeholder="Titre"
          v-model="post[0].title"
          @input="post.title"
        />
      </div>
      <div>
        <label for="description">Description</label>
        <br />
        <input
          type="text"
          name="description"
          placeholder="Description"
          v-model="post[0].description"
          @input="post.description"
        />
      </div>
      <div>
        <label for="content">Contenu</label>
        <br />
        <textarea
          type="textarea"
          name="content"
          v-model="post[0].content"
          @input="post.content"
          placeholder="Post"
          rows="10"
          cols="33"
        />
      </div>
      <div>
        <button type="submit" class="button">Envoyer</button>
        <button @click.prevent="cancelModify" id="buttonCancel" class="button">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

#creaPost {
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
  margin: 1rem;
}

.button:hover {
  background-color: #abc4ff;
  color: black;
}

#buttonCancel {
  grid-row: 2;
  grid-column: 2;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  max-width: fit-content;
}


</style>

<script>
import axios from "axios";

const token = localStorage.getItem("jwt");
let id;


export default {
  name: "modify",
  data() {
    return {
      post: {
        title: "",
        description: "",
        content: "",
        author: "",
      },
    };
  },
  methods: {
    
    cancelModify() {
      this.$router.go(-1);
    },

    modifyPost(id) {
      axios
        .put("http://localhost:5000/api/" + id, this.post[0], {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          console.log(res);
          this.$router.push("/post/" + id);
          alert("Votre message a été modifié avec succès.")
        })
        .catch((error) => {
          alert( "Erreur lors de la modification :" + " " + error.response.data.message);
        });
    },
    getId() {
      id = this.$route.params.id;
    },
    getPost(id) {
      axios.get("http://localhost:5000/api/" + id, {
          headers: { Authorization: "Bearer " + token },
        }).then((response) => {
        this.post = response.data;
      });
    },
  },
  beforeMount() {
    this.getId();
    this.getPost(id);
  },

  computed: {},
};
</script>
