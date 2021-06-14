<template>
  <div class="posts">
    <a
      v-if="typeof id !== 'undefined'"
      :href="$router.resolve({ name: 'post', params: { id: id } }).href"
      class="router-link-h2"
    >
      <h2>{{ titre }}</h2></a
    >
    <a
      v-if="typeof id !== 'undefined'"
      :href="
        $router.resolve({ name: 'userposts', params: { id: auteurId } }).href
      "
      class="router-link-small"
    >
      <small>{{ auteur }}</small></a
    >
    <img v-if="image" :src="'http://localhost:5000/' + image" :alt="image" />
    <Likes :id="id" :likes="likes" :length="length" id="likes" />
    <Commentaires :id="id" id="commentaires" :commentaires="commentaires" />
    <p id="hashtag">#{{ hashtag }}</p>
    <p id="contenu">{{ contenu }}</p>
    <button
      v-if="auteurId == canDelete || admin"
      @click="deletePost(id)"
      class="authorDelete"
    >
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script>
import Likes from "./Likes.vue";
import Commentaires from "./Comment.vue";
import axios from "axios"
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("jwt")

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
  ],
  components: {
    Likes,
    Commentaires,
  },
  data() {
    return {
      canDelete: userId,
    };
  },
  methods: {
    deletePost(id) {
      if (confirm("Voulez-vous vraiment supprimer ce post ?")) {
        axios
          .delete("http://localhost:5000/api/" + id, {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            console.log(res);
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
.posts {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  max-width: 70%;
  margin: auto;
  background: white;
  border-radius: 10px;
}

.router-link-h2 {
  text-align: center;
  grid-row: 1;
  grid-column: 1/3;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.router-link-small {
  grid-row: 2;
  grid-column: 1/3;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 0.8em;
}

.posts img {
  grid-row: 3;
  grid-column: 1/3;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: auto;
  width: 30rem;
}

#hashtag {
  grid-row: 5;
  grid-column: 1/3;
  font-size: 0.8em;
}

#contenu {
  grid-row: 6;
  grid-column: 1/3;
  font-style: normal;
}

#commentIcon {
  grid-row: 4;
  grid-column: 2;
  margin: auto;
}

#commentsinput {
  grid-row: 8;
  max-width: 70%;
  margin: auto;
  grid-column: 1/3;
}

.commentBtn {
  grid-row: 8;
  grid-column: 2;
  max-width: 20%;
  margin-left: 70%;
}

.authorDelete {
grid-column: 2;
grid-row: 1;
max-width: fit-content;
height: fit-content;
margin-right: 0;
margin-left: 95%;
background: transparent;
border: 1px solid #333;
border-radius: 3px;
}

</style>