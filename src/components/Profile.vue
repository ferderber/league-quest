<template>
    <div id="profile">
        <role-selector></role-selector>
    </div>
</template>

<script>
export default {
    name: "profile",
    computed: {

    },
    components: {
        'role-selector': () => import('./RoleSelector.vue')
    }
}
</script>
