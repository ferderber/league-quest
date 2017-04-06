import Vue from 'vue';
import VueRouter from 'vue-router';
import QuestList from 'components/QuestList';
import Login from 'components/Login';

Vue.use(VueRouter);

const routes = [{
    path: '/quests',
    component: QuestList
},
{
    path: '/login',
    component: Login
}
];

export default new VueRouter({
    routes
});