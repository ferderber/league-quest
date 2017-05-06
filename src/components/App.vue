<template>
  <div id="app">
    <md-whiteframe md-elevation="5" md-tag="nav">
      <div class="nav-bar">
        <span class="shortTitle">LQ</span>
        <span class="title">LeagueQuest</span>
        <span v-if="user">|</span>
        <router-link v-if="user" to="/quests">Quests</router-link>
        <router-link v-if="user" to="/leaderboard">Leaderboard</router-link>
        <span class="right">
          <router-link v-if="!user" to="/login" style="float: right">Login</router-link>
          <router-link v-if="!user" to="/signup" style="float: right">Sign up</router-link>
          <a v-if="user" href="#" @click="logout" style="float: right">Logout</a>
          <span v-if="user" class="userPane">
            <img width="32px" height="32px" :src="getProfileImage"/>
            <span>{{ user.summonerName }}</span>
          </span>
        </span>
      </div>
    </md-whiteframe>
    <notification>
    </notification>
    <md-whiteframe class="page" md-elevation="4" md-tag="div">
      <router-view></router-view>
    </md-whiteframe>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters(['isLoggedIn', 'user']),
    getProfileImage: function () {
      return `//avatar.leagueoflegends.com/NA/${this.user.summonerName}.png`;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  },
  components: {
    'notification': () => import('./Notification.vue')
  },

  mounted: function () {
    this.$store.dispatch('getUser');
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
  position: initial;
  width: 98%;
  min-height: 40%;
  margin: auto;
  padding: 25px;
  padding-bottom: 5px;
}

.userPane {
  margin: auto;
  line-height: 32px;
  margin-top: 16px;
  border-radius: 3px;
}

.right {
  float: right;
}

.right>* {
  flex: 1 1 auto;
  margin-right: 20px;
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
  padding-left: 20px;
  border-bottom: solid 1px #dfdfdf;
}

nav>* {
  flex: 1 1 auto;
  font-size: 1.3em;
  text-decoration: none;
  color: #000;
  height: 32px;
  vertical-align: middle;
  margin-right: 20px;
}

.nav-bar {
  height: 64px;
  line-height: 64px;
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
