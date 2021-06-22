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
    <div class="actionBtn">
      <Likes :id="id" :likes="likes" :length="length" id="likes" />
    </div>
    <p class="hashtag">#{{ hashtag }}</p>
    <p class="contenu">{{ contenu }}</p>
    <Commentaires
      :id="id"
      id="commentaires"
      :commentaires="commentaires"
      :replycomments="replycomments"
    />
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
.posts {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(2, 1fr);
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
  max-width: 100%;
  height: auto;
}

.hashtag {
  grid-row: 5;
  grid-column: 1/3;
  font-size: 0.8em;
}

.actionBtn {
  grid-row: 4;
  grid-column: 1;
  margin-left: 15rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.commentIcon {
  grid-row: 4;
  grid-column: 2;
  margin: auto;
  margin-right: 20rem;
}

.contenu {
  grid-row: 6;
  grid-column: 1/3;
  font-style: normal;
}

.commentsinput {
  grid-row: 1;
  grid-column: 1;
  max-width: 50rem;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 0;
  height: 3rem;
  border: 1px solid #333;
  border-right: none;
}

.commentBtn {
  grid-row: 1;
  grid-column: 2;
  width: 5rem;
  height: 3rem;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: auto;
  margin-left: 0;
}

.authorDelete {
  grid-column: 2;
  grid-row: 1;
  max-width: fit-content;
  height: fit-content;
  background: transparent;
  border: 1px solid #333;
  border-radius: 3px;
  position: absolute;
  right: 17%;
}

.authorModify {
  grid-column: 2;
  grid-row: 1;
  max-width: fit-content;
  height: fit-content;
  position: absolute;
  right: 22%;
  background: transparent;
}
</style>