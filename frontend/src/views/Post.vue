<template>
  <div class="home">
    <section id="main">
        <section class="container" v-for="post in posts">
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
          :replycomments="post.commentaire.commentaire"
        />
      </section>
    </section>
    <button @click="toggleModal">Appuie ici</button>
  </div>
</template>


<script>
import Posts from "../components/Posts.vue";
import axios from "axios";

const token = localStorage.getItem("jwt");

export default {
  name: "post",
  components: {
    Posts,
  },
  data() {
    return {
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
          reply: {
            author: "",
            text: "",
            createdAt: "",
          },
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
      console.log(this.posts[0].commentaire[0]);
    },
    getPost() {
      const id = this.$route.params.id;
      axios
        .get("http://localhost:5000/api/" + id, {
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
};
</script>


<style>
</style>