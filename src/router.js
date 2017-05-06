import Vue from 'vue';
import VueRouter from 'vue-router';
import QuestList from './components/QuestList';
import Login from './components/Login';
import Signup from './components/Signup';
import Leaderboard from './components/Leaderboard';

Vue.use(VueRouter);

const routes = [{
  path: '/quests',
  component: QuestList
},
{
  path: '/login',
  component: Login
},
{
  path: '/signup',
  component: Signup
},
{
  path: '/leaderboard',
  component: Leaderboard
}
];
export default new VueRouter({
  routes
});
