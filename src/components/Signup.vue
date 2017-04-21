<template>
    <md-whiteframe md-elevation="4" id="signup">
        <form id="signupForm" method="POST" @submit="signup">
            <md-input-container>
                <label>LQ Username</label>
                <md-input name="username"></md-input>
            </md-input-container>
            <md-input-container>
                <label>League Username</label>
                <md-input name="leaguename"></md-input>
            </md-input-container>
            <md-input-container>
                <label>Email</label>
                <md-input name="email"></md-input>
            </md-input-container>
            <md-input-container>
                <label>Password</label>
                <md-input name="password" type="password"></md-input>
            </md-input-container>
            <md-button class="md-primary" type="submit">Sign up</md-button>
        </form>
    </md-whiteframe>
</template>
<script type="text/javascript">
export default {
    name: 'signup',
    methods: {
        signup(e) {
            e.preventDefault();
            var form = new FormData(this.$el.querySelector('#signupForm'));
            this.$store.dispatch('signup',
                {
                    username: form.get('username'),
                    leaguename: form.get('leaguename'),
                    email: form.get('email'),
                    password: form.get('password')
                });
            return false;
        }
    }
}
</script>
<style>
#signup {
    min-width: 100px;
    max-width: 700px;
    margin: auto;
    padding: 40px;
    border-radius: 4px;
    height: 450px;
}

.md-primary {
    float: right;
}
</style>