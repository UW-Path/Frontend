<template>

    <v-app id="app">
      <div id="nav">
        <router-link to="/">Course Selection (Home)</router-link> |
        <router-link to="/landing">Landing</router-link>
      </div>
      <router-view/>
    </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;
  height: 10%;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body {
  height: 100vh;
}
</style>
