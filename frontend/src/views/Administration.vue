<template>
  <button @click="showPost">Posts</button>
  <button @click="showUsers">Users</button>
  <div v-if="showPostData && !showUsersData" v-for="post in posts">
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
      :admin="is_admin"
    />
  </div>
  <div v-if="showUsersData && !showPostData">
    <table class="scroll">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Rights</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr id="tr-users" v-for="user in users">
          <th>{{ user.id }}</th>
          <th>{{ user.name }}</th>
          <th>{{ user.surname }}</th>
          <th>{{ user.email }}</th>
          <th>{{ user.rights }}</th>
          <th>
            <button
              class="actionButton"
              id="deleteBtn"
              @click="deleteUser(user.id)"
            >
              <i class="fas fa-times"></i>
            </button>
            <button class="actionButton">
              <i class="fas fa-edit"></i>
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Posts from "../components/Posts.vue";
const token = localStorage.getItem("jwt");
const rights = localStorage.getItem("user_rights");

export default {
  components: {
    Posts,
  },
  data() {
    return {
      is_admin: false,
      showPostData: false,
      showUsersData: false,
      users: {
        id: "",
        name: "",
        surname: "",
        email: "",
        rights: "",
      },
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
    showPost() {
      this.showPostData = true;
      this.showUsersData = false;
    },
    showUsers() {
      this.showPostData = false;
      this.showUsersData = true;
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
    getUsers() {
      axios
        .get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          this.users = response.data;
        });
    },
    getLength(length) {
      this.postLength = length;
    },
    getRights() {
      if (rights == 768) {
        this.is_admin = true;
      } else {
        this.is_admin = false;
      }
    },
    deleteUser(id) {
      if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
        axios
          .delete("http://localhost:5000/api/admin/users/" + id, {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            console.log(res);
            this.$router.go("/administration");
            this.showUsersData = true;
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
  },
  beforeMount() {
    this.getRights();
    this.getPost();
    this.getUsers();
  },
};
</script>

<style>
#users {
  max-height: 25rem;
  overflow: auto;
  max-width: fit-content;
  margin: auto;
}

table {
  margin: auto;
  margin-top: 2rem;
  background: white;
  border-radius: 5px;
  padding: 2rem;
}

table th {
  padding: 1rem;
  margin: auto;
}

.actionButton {
  border: none;
  background: none;
  cursor: pointer;
}

#deleteBtn {
  color: red;
}

</style>