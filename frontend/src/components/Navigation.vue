<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="user">
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
                <a
                  @click="deconnect"
                  class="dropdown-item"
                >
                  Deconnexion
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item"></li>
        </ul>
        <ul id="ul-nav" v-else>
          <li>
            <a
              class="nav-link"
              :href="$router.resolve({ name: 'Home' }).href"
              id="router-nav"
            >
              Accueil
            </a>
          </li>
          <li><router-link to="/Login" class="nav-link">Login</router-link></li>
          <li>
            <router-link to="/Register" class="nav-link">Register</router-link>
          </li>
        </ul>
          <a :href="$router.resolve({ name: 'creaPost' }).href">
              <input
                type="input"
                placeholder="Créer un post..."
                autocomplete="off"
              />
          </a>
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
#createPostMobile {
  display: none;
}

#collapse {
  display: none;
  color: white;
}

#apph1 {
  color: #f04b4c;
  display: inline-block;
  font-size: 2rem;
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
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: 1;
}

#createpost input {
  width: 100%;
  margin-left: 50%;
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

@media only screen and (max-width: 1024px) {
  #apph1 {
    display: none;
  }

  #createPostMobile {
    display: block;
    margin-top: 1rem;
    margin-left: 3rem;
  }

  #createpost input {
    display: none;
  }

  #nav li {
    display: none;
  }

  .active {
    display: block;
    margin: auto;
  }

  #collapse {
    display: block;
    color: white;
    margin-right: 25%;
    margin-top: 1rem;
  }
}
</style>