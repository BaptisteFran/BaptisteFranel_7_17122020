<template>
  <nav id="nav">
    <div id="logo">
      <a :href="$router.resolve({ name: 'Home' }).href" id="router-nav">
        <img :src="'../images/icon.png'" alt="logo" />
        <h1 id="apph1">Groupomania</h1>
      </a>
    </div>
    <a :href="$router.resolve({ name: 'creaPost' }).href">
      <div id="createpost">
        <input type="input" placeholder="Créer un post..." autocomplete="off" />
      </div>
    </a>
    <ul id="ul-nav" v-if="user">
      <a :href="$router.resolve({name: 'userposts', params: { id: userId }}).href">
        <li id="username">
          <strong>{{ username }}</strong>
        </li>
      </a>
      <a :href="$router.resolve({name: 'Admin'}).href">
        <li v-if="admin">Administration</li>
      </a>
      <li>
        <a :href="$router.resolve({ name: 'Home' }).href" id="router-nav"> Accueil </a>
      </li>
      <li>
      </li>
      <li>
        <button @click="deconnect" id="deconnectionButton">Deconnexion</button>
      </li>
    </ul>
    <ul id="ul-nav" v-else>
      <li><a :href="$router.resolve({ name: 'Home' }).href" id="router-nav"> Accueil </a></li>
      <li><router-link to="/Login">Login</router-link></li>
      <li><router-link to="/Register">Register</router-link></li>
    </ul>
  </nav>
</template>

<script>
const user = localStorage.getItem("user");
const username = JSON.parse(user);
const userId = localStorage.getItem("userId");

export default {
  props: ["admin"],
  data() {
    return {
      user: false,
      username: username,
      userId: userId,
    };
  },
  methods: {
    isLoggedIn() {
      if (user) {
        this.user = true;
      } else {
        this.user = false;
      }
    },
    deconnect() {
      localStorage.clear();
      this.$router.go("/");
    },
  },
  beforeMount() {
    this.isLoggedIn();
  },
};
</script>


<style>
#apph1 {
  color: #f04b4c;
  display: inline-block;
}

.color-change-2x {
  animation: color-change-2x 2s linear infinite alternate both;
}
@keyframes color-change-2x {
  0% {
    color: #19dcea;
  }
  100% {
    color: #b22cff;
  }
}

#deconnectionButton {
  border: none;
  background: none;
  font-weight: bold;
  color: #fff;
  font-size: 1rem;
}

#deconnectionButton:hover {
  cursor: pointer;
}

#router-nav {
  display: grid;
  grid-template-columns: min-content;
}

#nav {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(4, 1fr);
  padding: 0;
  background-color: #213159;
  margin-bottom: 5rem;
  box-shadow: 1px 1px 5px #bcb8b1;
}

#createpost {
  grid-row: 1;
  grid-column: 3/4;
}

#createpost input {
  width: 100%;
  margin-left: 50%;
}

#logo {
  text-align: left;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 1rem;
}

#logo img {
  grid-row: 1;
  grid-column: 1;
  max-height: 3rem;
  margin: auto;
  margin-left: 0;
  margin-right: 1rem;
}

#logo h1 {
  grid-row: 1;
  grid-column: 2;
  margin: auto;
  margin-left: 0;
}

#nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

#ul-nav {
  list-style: none;
  text-align: right;
  grid-column: 3/5;
}

#ul-nav li {
  display: inline-block;
  color: white;
  margin: 1rem;
}

#nav a.router-link-exact-active {
  color: #b94642;
}
</style>