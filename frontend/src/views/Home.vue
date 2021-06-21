<template>
<input type="text" v-model="search" placeholder="Recherche.."/>
  <div v-for="post in postsFiltered">
    <Posts
      :titre="post.title"
      :auteur="post.authorName"
      :auteurId="post.author"
      :image="post.postImage"
      :hashtag="post.description"
      :contenu="post.content"
      :id="post.id"
      :likes="post.likes"
      :length="postLength"
      :commentaires="post.commentaire"
    />
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import Navigation from "../components/Navigation.vue";
import Posts from "../components/Posts.vue";
import axios from "axios";

const token = localStorage.getItem("jwt");

export default {
  name: "Home",
  components: {
    Modal,
    Navigation,
    Posts,
  },
  data() {
    return {
      search: '',
      showModal: false,
      is_admin: false,
      postLength: 0,
      posts: {
        id: "",
        title: "Titre",
        author: "",
        authorName: "Nom de l'auteur",
        postImage: "",
        description: "Hashtag",
        content: "",
        likes: 0,
        commentaire: {
          author: "",
          text: "",
          createdAt: "",
        },
        wholiked: {
          userId: "",
          postId: "",
        },
      },
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    getPost() {
      axios
        .get("http://localhost:5000/api/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          this.posts = response.data;
          this.getLength(this.posts.length);
        });
    },
    getLength(length) {
      this.postLength = length;
    },
  },
  beforeMount() {
    this.getPost();
  },
  computed: {
    postsFiltered() {
      // auto completion
      // commence par / contiennent / pourrait contenir (s'il y a des fautes)
      if (this.search) {
        return this.posts.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.posts;
      }
    },
  },
};

</script>

<style>
#app,
.modals {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0;
  padding: 0;
}


</style>
