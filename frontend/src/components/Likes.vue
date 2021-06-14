<template>
  <div class="likes">
    <span v-if="!likedPost" @click="likePost(id)"><i class="far fa-thumbs-up"></i></span>
    <span v-else @click="unlikePost(userWhoLiked)"><i class="fas fa-thumbs-up"></i></span>
    <p id="nbLikes">{{ likes }}</p>
  </div>
</template>

<script>
import axios from "axios";

const token = localStorage.getItem("jwt");
const userId = localStorage.getItem("userId");
let wholikedId;

export default {
  props: ["id"],
  data() {
    return {
      like: {
        userId: userId,
        PostId: "",
      },
      likes: 0,
      likedPost: false,
      userWhoLiked: "",
    };
  },
  methods: {
    likePost(id) {
      this.like.PostId = id;
      axios
        .post("http://localhost:5000/api/like/" + id, this.like, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          this.getLikes(this.id)
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    unlikePost(id) {
      axios
      .delete("http://localhost:5000/api/like/" + id, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          this.getLikes(this.id)
          this.likedPost = false;
        })
    },
    getLikes(id) {
      axios
        .get("http://localhost:5000/api/" + id, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
            if(response.data[0]) {
                this.likes = response.data[0].wholikes.length;
                this.getWhoLiked(response.data[0].wholikes);
            }
        })
        .catch((error) => {
          alert("bug" + error);
        });
    },
    getWhoLiked(post) {
      const id = userId
      let count = 0;
      while(count != post.length) {
        let likeduser = post[count].userId
        if(likeduser == id) {
          this.likedPost = true
          this.userWhoLiked = post[count].id
        } else {
          this.likedPost = false
        }
        count++
      }
    }
  },
  created() {
    this.getLikes(this.id);
  },
};
</script>

<style>
.likes {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
}

.likes span {
  grid-row: 1;
  grid-column: 1;
  margin: auto;
  margin-right: 1rem;
}

#nbLikes {
  grid-row: 1;
  grid-column: 2;
  margin: auto;
  margin-left: 1rem;
}
</style>
