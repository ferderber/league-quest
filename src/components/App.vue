<template>
  <div id="app">
    <md-whiteframe md-elevation="5"
                   md-tag="nav">
      <span class="shortTitle">LQ</span>
      <span class="title">LeagueQuest</span>
      <span>|</span>
      <router-link to="/quests">Quests</router-link>
      <router-link v-if="!isLoggedIn"
                   to="/login"
                   style="float: right">Login</router-link>
    </md-whiteframe>
    <notification>
    </notification>
    <md-whiteframe class="page"
                   md-elevation="4"
                   md-tag="div">
      <router-view></router-view>
    </md-whiteframe>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  components: {
    'notification': () => import('./Notification.vue')
  }
}
</script>

<style>
@import url('//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic');
@import url('//fonts.googleapis.com/icon?family=Material+Icons');
html,
body,
#app {
  height: 100%;
  font-family: 'Open Sans', sans-serif;
}

.page {
  width: 98%;
  margin: auto;
  height: 90%;
  padding: 25px;
  padding-bottom: 5px;
  overflow: auto;
  overflow-x: hidden;
}

body {
  background-color: #f9f9f9;
  margin: 0;
}

* {
  box-sizing: border-box;
}

nav {
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  border-bottom: solid 1px #dfdfdf;
}

nav>* {
  flex: 1 1 auto;
  font-size: 1.3em;
  text-decoration: none;
  color: #000;
  margin-right: 20px;
}

nav>a:hover {
  color: #9E9E9E;
}

@media (min-width: 600px) {
  .shortTitle {
    display: none;
  }
  .title {
    display: inline;
  }
}

@media (max-width: 500px) {
  .shortTitle {
    display: inline;
  }
  .title {
    display: none;
  }
}
</style>