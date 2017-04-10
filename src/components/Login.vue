<template>
    <md-whiteframe md-elevation="4"
                   id="login">
        <form id="loginForm"
              method="POST"
              @submit="login">
            <md-input-container>
                <label>Username</label>
                <md-input name="username"></md-input>
            </md-input-container>
            <md-input-container>
                <label>Password</label>
                <md-input name="password"
                          type="password"></md-input>
            </md-input-container>
            <md-button class="md-primary"
                       type="submit">Login</md-button>
        </form>
    </md-whiteframe>
</template>
<script type="text/javascript">
export default {
    name: 'login',
    methods: {
        login(e) {
            e.preventDefault();
            var form = new FormData(this.$el.querySelector('#loginForm'));
            this.$store.dispatch('login',
                {
                    username: form.get('username'),
                    password: form.get('password')
                })
                .then(() => this.$router.push('quests'))
                .catch(() => { });
            return false;
        }
    }
}
</script>
<style>
#login {
    min-width: 100px;
    max-width: 500px;
    margin: auto;
    padding: 40px;
    border-radius: 4px;
    height: 300px;
}

.md-primary {
    float: right;
}
</style>