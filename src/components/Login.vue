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
        <md-snackbar ref="snackbar"
                     md-position="top right"
                     :md-duration="4000">
            <span ref="errorMsg"></span>
        </md-snackbar>
    </md-whiteframe>
</template>
<script type="text/javascript">
export default {
    name: 'login',
    methods: {
        login(e) {
            e.preventDefault();
            var form = new FormData(this.$el.querySelector('#loginForm'));
            this.$store.dispatch('login', { username: form.get('username'), password: form.get('password') });
            //     .then(res => {
            //     if (res.status !== 200)
            //         throw res;
            //     else
            //         return res.json();
            // })
            //     .then((data) => {
            //         if (data.token) {
            //             this.$router.push('quests');
            //         }
            //     })
            //     .catch((err) => {
            //         if (err.status === 401) {
            //             this.$refs.errorMsg.innerHTML = "Invalid username or password";
            //         } else if (err.status === 404) {
            //             this.$refs.errorMsg.innerHTML = "Something happened";
            //         } else {
            //             this.$refs.errorMsg.innerHTML = err.statusText;
            //         }
            //         this.$refs.snackbar.open();
            //     });
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