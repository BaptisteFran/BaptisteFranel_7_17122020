<template>
  <span id="commentIcon" @click="focusInput"
    ><i class="fas fa-comments"></i
  ></span>
  <div class="commentaires">
    <div v-if="noComment" >
      <p>Pas de commentaires...</p>
    </div>
    <div v-for="commentaires in postComments" class="comment">
      <button @click="deleteComment(commentaires.id)" class="deleteButton">
        <i class="fas fa-times"></i>
      </button>
      <p class="commentAuthor">{{ commentaires.author }}</p>
      <p>{{ commentaires.text }}</p>
    </div>
  </div>
  <input
    v-model="comment.text"
    :id="id"
    type="text"
    placeholder="Entrez votre commentaire"
    required
  />
  <button @click="postComment" class="commentBtn">Envoyer</button>
</template>

<script>
import axios from "axios";

const userId = localStorage.getItem("userId");
const username = JSON.parse(localStorage.getItem("username"));
const token = localStorage.getItem("jwt");

export default {
  props: ["id", "commentaires"],
  data() {
    return {
      commentArray: [],
      comments: [],
      postComments: [],
      noComment: true,
      comment: {
        author: username,
        authorId: userId,
        text: "",
        PostId: "",
      },
    };
  },
  methods: {
    focusInput() {
      document.getElementById(this.id).focus();
    },
    postComment() {
      this.comment.PostId = this.id;
      axios
        .post(
          "http://localhost:5000/api/postcomment/" + this.id,
          this.comment,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          console.log(res);
          this.$router.go(this.$router.currentRoute);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    deleteComment(id) {
      axios
        .delete("http://localhost:5000/api/postcomment/" + id, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          console.log(res);
          this.$router.go(this.$router.currentRoute);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    getComments() {
      this.commentArray.push(this.commentaires);
      this.comments = this.commentArray[0];
      let count = 0;
      let commentLength;
      if (this.comments) {
        commentLength = this.comments.length;
      }
      while (count != commentLength) {
        if (this.comments[count] != undefined) {
          this.postComments.push(this.comments[count]);
        }
        count++;
      }
    },
    noComments() {
      if(this.postComments.length <= 0) {
        this.noComment = true;
      } else {
        this.noComment = false;
      }
    }
  },
  beforeMount() {
    this.getComments();
    this.noComments();
  },
};
</script>


<style>
.commentaires {
  background: #efefef;
  border-radius: 10px;
  grid-column: 1/3;
  grid-row: 7;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.comment {
  text-align: left;
}

.comment p {
  margin-top: 0;
}

.commentAuthor {
  font-style: normal;
}

.deleteButton {
grid-column: 2;
grid-row: 1;
max-width: fit-content;
height: fit-content;
margin-right: 0;
margin-left: 95%;
background: white;
border: 1px solid #333;
border-radius: 3px;
margin-top: 2rem;
}
</style>