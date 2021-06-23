<template>
  <div class="commentaires">
    <div v-if="noComment">
      <p>Pas de commentaires...</p>
    </div>
    <div v-for="commentaires in postComments" class="comment">
      <p class="commentAuthor">
        Par : {{ commentaires.author }}, le : {{ commentaires.created_at}}
      </p>
      <p>
        <button
          v-if="userId == commentaires.authorId"
          @click="deleteComment(commentaires.id)"
          class="deleteButton"
        >
          <i class="fas fa-times"></i>
        </button>
        {{ commentaires.text }}
      </p>
      <div v-for="commentreply in commentaires.reply" class="replytocomment">
        <p>
          <span
            v-if="userId == commentreply.authorId"
            @click="deleteReply(commentreply.id)"
            class="deleteReplyButton"
          >
            <i class="fas fa-times"></i>
          </span>
          {{ commentreply.author }} : {{ commentreply.text }}
        </p>
      </div>
      <div class="row reply">
        <div class="col-md-6">
          <input
            class="replyInput"
            v-model="Commentreplytext[commentaires.id]"
            type="text"
            placeholder="Répondre..."
            required
          />
        </div>
        <div class="col-md-6">
          <button
            @click="replyComment(commentaires.id)"
            class="btn btn-secondary replyBtn"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="card-footer text-muted p-2 row">
    <div class="col-md-9">
      <input
        v-model="comment.text"
        :id="id"
        type="text"
        placeholder="Entrez votre commentaire"
        required
      />
    </div>
    <div class="col-md-3">
      <button @click="postComment" class="btn btn-secondary">Envoyer</button>
    </div>
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
        created_at: "",
      },
      reply: {
        author: username,
        authorId: userId,
        text: "",
        commentId: "",
        created_at: "",
      },
      Commentreplytext: [],
    };
  },
  methods: {
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
.card-footer {
  padding: 0;
  margin: 0;
}

.card-footer input {
  width: 100%;
  margin: auto;
}

.card-footer button {
  width: 100%;
  margin: auto;
}

.commentaires {
  background: #efefef;
  border-radius: 10px;
  grid-column: 1/3;
  grid-row: 7;
  margin: 1rem;
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
  max-width: fit-content;
  height: fit-content;
  border: none;
}

.deleteReplyButton {
  width: 5px;
  height: 5px;
  margin-right: 1rem;
}

.deleteReplyButton:hover {
  cursor: pointer;
}

.replyInput {
  margin: auto;
  width: 100%;
  padding: 0.375rem 0.75rem;
}

.replyBtn {
  margin: auto;
  margin-right: 0;
}
</style>