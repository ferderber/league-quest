<template>
    <div id="role-selector">
        <h2>Role Selection</h2>
        <ul v-if="user">
            <li>
                <md-switch class="md-primary" name="assassin" @change="updateRole('assassin')" :value="user.roles.assassin">Assassin</md-switch>
            </li>
            <li>
                <md-switch class="md-primary" name="marksman" @change="updateRole('marksman')" :value="user.roles.marksman">Marksman</md-switch>
            </li>
            <li>
                <md-switch class="md-primary" name="fighter" @change="updateRole('fighter')" :value="user.roles.fighter">Fighter</md-switch>
            </li>
            <li>
                <md-switch class="md-primary" name="tank" @change="updateRole('tank')" :value="user.roles.tank">Tank</md-switch>
            </li>
            <li>
                <md-switch class="md-primary" name="mage" @change="updateRole('mage')" :value="user.roles.mage">Mage</md-switch>
            </li>
            <li>
                <md-switch class="md-primary" name="support" @change="updateRole('support')" :value="user.roles.support">Support</md-switch>
            </li>
        </ul>
    </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
    name: 'role-selector',
    methods: {
        updateRole: function (role) {
            this.$store.dispatch('patchRole', role);
        }
    },
    computed: {
        ...mapGetters(['user'])
    }
}
</script>
<style>
#role-selector {
    max-width: 550px;
    margin: auto;
}

#role-selector>ul {
    list-style: none;
}
</style>
