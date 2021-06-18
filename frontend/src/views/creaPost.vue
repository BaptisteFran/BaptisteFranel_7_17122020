<template>
  <div id="creaPost">
    <h2>Créer votre publication</h2>
    <form @submit.prevent="creaPost" id="formCreaPost">
      <div id="title">
        <label for="title">Titre</label>
        <br />
        <input
          type="text"
          name="title"
          placeholder="Title"
          v-model="form.title"
        />
      </div>
      <div id="description">
        <label for="description">Description</label>
        <br />
        <input
          type="text"
          name="description"
          placeholder="Description"
          v-model="form.description"
        />
      </div>
      <div id="postimage">
        <label for="postimage">Image</label>
        <br />
        <input
          type="file"
          name="postimage"
          ref="postimage"
          placeholder="postimage"
          v-on:change="handleFileUpload()"
        />
      </div>
      <div>
        <label for="content">Content</label>
        <br />
        <textarea
          type="textarea"
          name="content"
          v-model="form.content"
          placeholder="Post"
          rows="10"
          cols="33"
          id="textarea"
        />
      </div>
      <div id="submitButton">
        <button type="submit" class="button">Envoyer</button>
      </div>
    </form>
  </div>
</template>

<style>
#formCreaPost {
  width: 25rem;
}

div {
  padding: 1rem;
}

div label {
  color: #4b4a4a;
  text-align: left;
}

div input {
  width: 20rem;
  margin: auto;
  margin-top: 1rem;
  border-radius: 2px;
  border: none;
}

#textarea {
  width: 100%;
  margin-top: 1rem;
  border-radius: 2px;
  border: none;
  resize: none;
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

#postimage input {
  background-color: #ffffff;
}
</style>

<script>
import axios from "axios";

const token = localStorage.getItem("jwt");
const userId = localStorage.getItem("userId");
const username = localStorage.getItem("username");

export default {
  name: "creaPost",
  data() {
    return {
      form: {
        title: "",
        description: "",
        content: "",
        postimage: "",
        author: userId,
        authorName: JSON.parse(username),
      },
    };
  },
  methods: {
    handleFileUpload() {
      this.form.postimage = this.$refs.postimage.files[0];
    },
    creaPost() {
      let formData = new FormData();
      formData.append("postimage", this.form.postimage);
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("content", this.form.content);
      formData.append("author", this.form.author);
      formData.append("authorName", this.form.authorName);

      axios
        .post("http://localhost:5000/api/", formData, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre post a bien été créé");
          this.$router.go(-1);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
