<template>
  <span class="commentIcon" @click="showCommentInput"
    ><i class="fas fa-comments"></i
  ></span>
  <div class="commentaires">
    <div v-if="noComment">
      <p>Pas de commentaires...</p>
    </div>
    <div v-for="commentaires in postComments" class="comment">
      <button
        v-if="userId == commentaires.authorId"
        @click="deleteComment(commentaires.id)"
        class="deleteButton"
      >
        <i class="fas fa-times"></i>
      </button>
      <p class="commentAuthor">{{ commentaires.author }}</p>
      <p>{{ commentaires.text }}</p>
      <div v-for="commentreply in commentaires.reply" class="replytocomment">
        <p>{{ commentreply.author }} : {{ commentreply.text }}</p>
        <span
          v-if="userId == commentreply.authorId"
          @click="deleteReply(commentreply.id)"
          class="deleteReplyButton"
        >
          <i class="fas fa-times"></i>
        </span>
      </div>
      <div class="reply">
        <input
          class="replyInput"
          v-model="Commentreplytext[commentaires.id]"
          type="text"
          placeholder="Répondre..."
          required
        />
        <button @click="replyComment(commentaires.id)" class="replyBtn">
          Envoyer
        </button>
      </div>
    </div>
  </div>
  <div v-if="isCommenting" class="commentPost">
    <input
      v-model="comment.text"
      class="commentsinput"
      :id="id"
      type="text"
      placeholder="Entrez votre commentaire"
      required
    />
    <button @click="postComment" class="commentBtn">Envoyer</button>
  </div>
</template>

<script>
import axios from "axios";

const userId = localStorage.getItem("userId");
const username = JSON.parse(localStorage.getItem("username"));
const token = localStorage.getItem("jwt");

export default {
  props: ["id", "commentaires", "replycomments"],
  data() {
    return {
      isCommenting: false,
      userId: userId,
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
      reply: {
        author: username,
        authorId: userId,
        text: "",
        commentId: "",
      },
      Commentreplytext: [],
    };
  },
  methods: {
    showCommentInput() {
      this.isCommenting = !this.isCommenting;
    },
    postComment() {
      this.comment.PostId = this.id;
      if (this.comment.text == "") {
        alert("Votre commentaire ne peut pas être vide.");
      } else {
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
      }
    },
    replyComment(id) {
      this.reply.text = this.Commentreplytext[id];
      this.reply.commentId = id;
      if (this.reply.text == "") {
        alert("Votre commentaire ne peut pas être vide.");
      } else {
        axios
          .post("http://localhost:5000/api/replycomment/" + id, this.reply, {
            headers: { Authorization: "Bearer " + token },
          })
          .then(() => {
            this.$router.go(this.$router.currentRoute);
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
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
    deleteReply(id) {
      axios
        .delete("http://localhost:5000/api/replycomment/" + id, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
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
      if (this.postComments.length <= 0) {
        this.noComment = true;
      } else {
        this.noComment = false;
      }
    },
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

.deleteReplyButton {
  grid-column: 2;
  grid-row: 1;
  width: 5px;
  height: 5px;
  margin-right: 0;
  margin-left: 95%;
  margin-top: 2rem;
}

.reply {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1;
  margin: auto;
}

.replyInput {
  grid-column: 2;
  grid-row: 1;
  margin: auto;
  height: 2rem;
  margin-right: 5rem;
}

.replyBtn {
  grid-column: 2/3;
  grid-row: 1;
  max-width: 5rem;
  height: 2rem;
  margin: auto;
  margin-right: 0;
}

.commentPost {
  grid-row: 8;
  grid-column: 1/3;
  display: grid;
  grid-template-rows: 1;
  grid-template-columns: 2;
  margin: auto;
}
</style>