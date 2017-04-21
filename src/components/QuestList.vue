<template>
    <div id="quest-list">
        <div class="available-quests">
            <quest v-for="(quest, index) in questOffers" v-bind:item="quest" v-on:select="select" :key="index" :in-progress="true"></quest>
        </div>
        <ul>
            <quest v-for="(quest,index) in activeQuests" v-bind:item="quest" :key="index" :in-progress="false"></quest>
        </ul>
    </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
    name: 'quest-list',
    computed: {
        ...mapGetters(['activeQuests', 'completedQuests', 'questOffers', 'quests'])
    },
    components: {
        'quest': () => import('./Quest.vue')
    },
    methods: {
        select(el) {
            this.deselectQuests();
            if (el.className === "") {
                el.className = "selected";
                this.selectedQuest = el.key;
            }
        },
        deselectQuests() {
            var quests = this.$el.querySelectorAll('.available-quests > *').forEach((quest) => quest.className = "");
        },
    },
    mounted: function () {
        this.$store.dispatch('getQuests');
    }
}

</script>

<style>
.available-quests {
    display: flex;
    margin: auto;
    width: 100%;
    min-width: 400px;
}

.available-quests>* {
    padding: 2px;
}

.selected {
    padding: 0px;
    border: solid 2px #69F0AE;
    border-radius: 2px;
    background-color: #69F0AE;
}
</style>