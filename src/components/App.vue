<template>
  <div id="app">
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="$refs.sidenav.toggle()">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">LeagueQuest</h2>
    </md-toolbar>
    <md-sidenav class="md-left" ref="sidenav">
      <md-toolbar class="md-account-header">
        <md-list class="user-p" md-theme="blue" v-if="user">
          <md-list-item class="user-pane">
            <div>
              <md-avatar class="md-large">
                <img :src="getProfileImage" alt="Profile icon" />
              </md-avatar>
              <span v-if="user" class="summoner-name">{{user.summonerName}}</span>
            </div>
            <md-list-expand>
              <md-list>
                <md-list-item @click.native="onNavigate('profile')" class="md-inset">
                  <md-icon>account_circle</md-icon>
                  <span>Profile</span>
                </md-list-item>
                <md-list-item @click.native="logout" class="md-inset">
                  <md-icon>exit_to_app</md-icon>
                  <span>Logout</span>
                </md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
        </md-list>
      </md-toolbar>
      <md-list v-if="user">
        <md-list-item @click.native="onNavigate('quests')" class="md-primary">
          <md-icon>gamepad</md-icon>
          <span>Quests</span>
        </md-list-item>
        <md-list-item @click.native="onNavigate('leaderboard')" ref="leaderboard">
          <md-icon>people</md-icon>
          <span>Leaderboard</span>
        </md-list-item>
        <md-list-item @click.native="$refs.sidenav.toggle()" name="recent" ref="recent">
          <md-icon>access_time</md-icon>
          <span>Recent</span>
        </md-list-item>
      </md-list>
      <md-list v-if="!user">
        <md-list-item @click.native="onNavigate('login')" class="md-primary">
          <md-icon></md-icon>
          <span>Login</span>
        </md-list-item>
        <md-list-item @click.native="onNavigate('signup')" class="md-primary">
          <md-icon></md-icon>
          <span>Signup</span>
        </md-list-item>
      </md-list>
    </md-sidenav>
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
    },
    onNavigate(ref) {
      this.$store.dispatch('route', ref);
      this.$refs.sidenav.toggle();
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

.md-sidenav .md-list-text-container> :nth-child(2) {
  color: rgba(#fff, .54);
}

.page {
  position: initial;
  width: 98%;
  min-height: 40%;
  margin: auto;
  padding: 25px;
  padding-bottom: 30px;
}

.summoner-name {
  font-size: 1.5em;
  margin: 8px;
  line-height: 1.5em;
}

.md-account-header {
  padding-bottom: 30px;
  min-height: 104px !important;
}

.user-pane {
  min-height: 80px;
}

body {
  background-color: #f9f9f9;
  margin: 0;
}
</style>
