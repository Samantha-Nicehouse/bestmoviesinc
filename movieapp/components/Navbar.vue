<template>
  <div :design="design">
    <LoginModal ref="login" />
    <RegisterModal ref="register" />
    <nav
      ref="navbar"
      class="navbar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div class="logo-title">
        <nuxt-link to="/"
          ><img src="../assets/imgs/logo.png" alt="logo"
        /></nuxt-link>
      </div>
      <div v-if="isAuth" class="links">
        <nuxt-link class="navbar-item" to="/statistics/popularmovies">Popular Movies</nuxt-link>
        <nuxt-link class="navbar-item" to="/statistics/topratedmovies">Top Rated Movies</nuxt-link>
        <nuxt-link class="navbar-item" to="/statistics/topgenremovies">Top Genre Movies</nuxt-link>
        <nuxt-link class="navbar-item" to="/statistics/topactormovies">Top Actor Movies</nuxt-link>
        <nuxt-link class="navbar-item" to="/favorites">Favorites</nuxt-link>
      </div>

      <div
        v-if="!isAuth"
        class="button-container"
      >
        <div class="auth-btn" @click="openLogin()">
          <button class="button">Login</button>
        </div>
        <div class="auth-btn" @click="openRegister()">
          <button class="button">Register</button>
        </div>
      </div>
      <div v-else>
        <div class="auth-btn" @click="logOut()">
          <button class="button">Log Out</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import {mapState} from "vuex";
import LoginModal from '../components/LoginModal'
import RegisterModal from '../components/RegisterModal'
export default {
  name: 'NavBar',
  components: {
    LoginModal,
    RegisterModal,
  },
  props: {
    design: {
      validator: (prop) => ['default', 'movielist'].includes(prop),
      default: 'default',
    },
  },
  computed: {
    ...mapState({
      isAuth: state => state.isAuth
    })
  },
  methods: {
    openLogin() {
      const x = 'login'
      this.$refs[x].open()
    },
    openRegister() {
      const y = 'register'
      this.$refs[y].open()
    },
    async logOut() {
      await this.$store.dispatch("logout")
    },
  },
}
</script>

<style lang="scss" scoped>
// @import '../assets/style/butons.scss';
nav {
  position: absolute !important;
  z-index: 3;
}
.navbar {
  display: flex;
  min-width: 100%;
  min-height: 80px;
  color: white;
  align-items: center;
  .links {
    padding-left: 24px;
    width: 60% !important;
    height: 100%;
    @media (min-width: 1800px) {
      margin-left: 1%;
    }
    @media (min-width: 2000px) {
      margin-left: 3%;
    }
    @media (min-width: 2100px) {
      margin-left: 7%;
    }
    @media (min-width: 2300px) {
      margin-left: 10%;
    }
    @media (min-width: 2400px) {
      margin-left: 12%;
    }
  }
  .auth-btn {
    align-self: right;
    height: 100%;
    margin-right: 12px;
    display: flex;
    justify-content: center;
  }
}
.navbar-item {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  position: relative;
  transition: all 0.3s ease;
  margin: 8px 12px;
  font-size: 19px;
  color: white;
  text-decoration: none;
  &:hover {
    transition: all 0.3s ease;
    font-size: 21px;
    color: rgb(202, 80, 23);
  }
}
.logo-title {
  text-align: center;
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  width: 10%;
  height: 100%;
  cursor: default;
  img {
    width: 100px;
    height: 80px;
  }
}
.button-container {
  display: flex;
  float: right;
}
.button {
  background-color: #c92502;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
}
.navbar[design='default'] {
  background-color: #211f1f !important;
}
.navbar[design='movielist'] {
  background-color: #211f1f !important;
}
</style>
