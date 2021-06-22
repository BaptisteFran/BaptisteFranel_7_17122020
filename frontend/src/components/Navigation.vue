<template>
  <nav class="navbar navbar-expand-lg navbar-bleu bg-bleu">
    <div class="container-fluid">
      <a :href="$router.resolve({ name: 'Home' }).href" class="navbar-brand">
        <img :src="'../images/icon.png'" alt="logo" class="logo-img" />
        <h1 id="apph1">Groupomania</h1>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon">
          <i class="fas fa-bars"></i>
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <a class="mx-auto mb-2 mb-lg-0"
          :href="$router.resolve({ name: 'creaPost' }).href"
        >
          <input class="createPostInput"
            type="input"
            placeholder="Créer un post..."
            autocomplete="off"
          />
        </a>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="user">
          <li class="nav-item">
            <a :href="$router.resolve({ name: 'Home' }).href" class="nav-link">
              Accueil
            </a>
          </li>
          <li class="nav-item"></li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Compte
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li v-if="admin">
                <a
                  class="dropdown-item"
                  :href="$router.resolve({ name: 'Admin' }).href"
                  >Administration</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  :href="
                    $router.resolve({
                      name: 'userposts',
                      params: { id: userId },
                    }).href
                  "
                >
                  <strong>{{ username }}</strong>
                </a>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a @click="deconnect" class="dropdown-item"> Deconnexion </a>
              </li>
            </ul>
          </li>
          <li class="nav-item"></li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-else>
          <li class="nav-item">
            <a
              class="nav-link"
              :href="$router.resolve({ name: 'Home' }).href"
              id="router-nav"
            >
              Accueil
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Register">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
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
      showList: false,
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

.createPostInput {
  margin: 0;
}

.navbar-toggler > span > i {
  color: white;
  margin-top: 0.3rem;
}

#apph1 {
  color: #f04b4c;
  display: inline-block;
  font-size: 2rem;
  margin: auto;
  margin-left: 0;
}

.navbar-bleu a {
  color: white;
}

.bg-bleu {
  background-color: #213159;
  box-shadow: 1px 1px 5px #bcb8b1;
}

.logo {
  text-align: left;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 1rem;
}

.logo-img {
  max-height: 3rem;
  margin: auto;
  margin-left: 0;
  margin-right: 1rem;
}

#nav a.router-link-exact-active {
  color: #b94642;
}

.dropdown-menu > li > a {
  color: #333;
}

@media only screen and (max-width: 1024px) {
  #apph1 {
    display: none;
  }
}
</style>