<template>
    <div id="notification">
        <md-snackbar ref="snackbar" md-duration="2500" @close="close" md-position="bottom right">
            <span id="errorMsg" ref="errorMsg">{{message}}</span>
        </md-snackbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'notification',
    computed: {
        ...mapGetters(['isError', 'message'])
    },
    methods: {
        close() {
            this.$store.dispatch('hideNotification');
        }
    },
    watch: {
        'message': function () {
            if (this.isError) {
                this.$refs.snackbar.open();
            } else
                this.$refs.snackbar.close();
        }
    }
}
</script>