<template>
  <Navigation :admin="is_admin" />  
  <router-view />
</template>

<script>
import Navigation from "./components/Navigation.vue";

const rights = localStorage.getItem('user_rights');

export default {
  name: "App",
  components: {
    Navigation,
  },
  data() {
    return {
      search: "",
      showModal: false,
      is_admin: false,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    getRights() {
      if(rights == 768) {
        this.is_admin = true;
      } else {
        this.is_admin = false;
      }
    }
  },
  beforeMount() {
    this.getRights()
  }
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
