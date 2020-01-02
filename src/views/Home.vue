<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div v-if="!$auth.loading">
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'

export default {
  name: 'home',
  compoments: {
    HelloWorld
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect()
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      })
    }
  }
}
</script>
