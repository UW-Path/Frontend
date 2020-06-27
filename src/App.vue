<template>

    <v-app id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/CourseSelection">Course Selection</router-link> |
        <router-link to="/landing">Landing</router-link>
      </div>
      <router-view/>
      <!-- <v-footer></v-footer> -->
    </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: fixed;
  bottom: 50px;
  right: 50px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
