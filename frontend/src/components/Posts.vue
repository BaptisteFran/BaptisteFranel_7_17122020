<template>
  <div class="card text-center mb-3">
    <div class="card-header p-3">
      <a
        v-if="typeof id !== 'undefined'"
        :href="
          $router.resolve({ name: 'userposts', params: { id: auteurId } }).href
        "
        class="router-link-small"
      >
        {{ auteur }}
      </a>
      <button
        v-if="auteurId == userId || admin"
        @click="deletePost(id)"
        class="authorDelete"
      >
        <i class="fas fa-times"></i>
      </button>
      <a
        :href="$router.resolve({ name: 'Modify', params: { id: id } }).href"
        v-if="auteurId == userId || admin"
        class="authorModify"
      >
        <i class="fas fa-edit"></i>
      </a>
    </div>
    <div class="card-body">
      <a
        v-if="typeof id !== undefined"
        :href="$router.resolve({ name: 'post', params: { id: id } }).href"
        class="router-link-h2"
      >
        <h3 class="card-title mb-5 mt-4">{{ titre }}</h3>
      </a>
      <p class="card-text">#{{ hashtag }}</p>
      <img
        v-if="image"
        class="img-fluid img-post mt-4 mb-3"
        :src="'http://localhost:5000/' + image"
        :alt="image"
      />
      <Likes :id="id" :likes="likes" :length="length" id="likes" class="mb-3" />

      <p class="card-text">{{ contenu }}</p>
      <hr>
      <Commentaires
        :id="id"
        id="commentaires"
        :commentaires="commentaires"
        :replycomments="replycomments"
      />
    </div>
  </div>
</template>



<script>
import Likes from "./Likes.vue";
import Commentaires from "./Comment.vue";
import axios from "axios";
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("jwt");

export default {
  props: [
    "titre",
    "auteur",
    "auteurId",
    "image",
    "hashtag",
    "contenu",
    "id",
    "likes",
    "length",
    "commentaires",
    "admin",
    "replycomments",
  ],
  components: {
    Likes,
    Commentaires,
  },
  data() {
    return {
      userId: userId,
    };
  },
  methods: {
    deletePost(id, image) {
      image = this.image;
      if (confirm("Voulez-vous vraiment supprimer ce post ?")) {
        axios
          .delete("http://localhost:5000/api/" + id, {
            headers: { Authorization: "Bearer " + token },
            data: { postimg: image },
          })
          .then(() => {
            this.$router.go("/");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
  },
};
</script>


<style>

  hr {
    max-width: 75%;
    margin: 2rem auto;
  }

.card {
  margin: auto;
  padding: 0;
  max-width: 75%;
}

.card a {
  text-decoration: none;
  color: #333;
}

.card-body {
  padding: 0;
}

.img-post {
  margin: auto;
  max-width: 50%;
  height: auto;
}

.authorDelete {
  grid-column: 2;
  grid-row: 1;
  max-width: fit-content;
  height: fit-content;
  background: transparent;
  position: absolute;
  right: 17%;
  border: none;
}

.authorModify {
  grid-column: 2;
  grid-row: 1;
  max-width: fit-content;
  height: fit-content;
  position: absolute;
  right: 22%;
  color: black;
  background: transparent;
}
</style>