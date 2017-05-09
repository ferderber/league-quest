<template>
    <div id="quest-list">
        <div>
            <md-whiteframe class="available-quests" v-if="questOffers.length != 0">
                <h3>Choose a new Quest</h3>
                <div>
                <quest v-for="(quest, index) in questOffers" v-bind:item="quest" v-on:select="(el) => select(el, index)" :key="quest.id"></quest>
                </div>
            </md-whiteframe>
            <md-whiteframe class="active-quests">
                <h3>Active quests: {{activeQuests.length}}/5</h3>
                <quest v-for="(quest,index) in activeQuests" v-bind:item="quest" :key="quest.id"></quest>
            </md-whiteframe>
            <md-whiteframe class="completed-quests">
                <h3>Completed Quests: {{completedQuests.length}}</h3>
                <quest v-for="(quest, index) in completedQuests" v-bind:item="quest" :key="quest.id"></quest>
            </md-whiteframe>
        </div>
        <md-button class="md-fab bot-right" type="button" @click.native="updateQuests">
            <md-icon>autorenew</md-icon>
        </md-button>
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
        updateQuests() {
            this.$store.dispatch('updateQuests');
        },
        select(el, index) {
            if (el.className === 'selected') {
                this.$store.dispatch('acceptQuest', this.questOffers[index]);
                this.deselectQuests();
            }
            if (el.className === '') {
                this.deselectQuests();
                el.className = 'selected';
                this.selectedQuest = el.key;
            }             
        },
        deselectQuests() {
            var quests = this.$el.querySelectorAll('#quest').forEach((quest) => quest.className =''); 
        },

    },
    mounted: function () {
        this.$store.dispatch('getQuests');
    }
}

</script>

<style>
.available-quests {
    padding: 20px;
    padding-top: 5px;
    margin: auto;
    margin-bottom: 10px;
}
.available-quests > h3 {
    text-align: center;
}
.available-quests > div {
    display: flex;
    margin: auto;
    width: 100%;
    min-width: 400px;
}

.active-quests {
    width: 500px;
    padding: 20px;
    padding-top: 5px;
    margin: auto;
    margin-bottom: 10px;
}

.completed-quests {
    width: 500px;
    margin: auto;
    margin-bottom: 10px;
    padding: 20px;
    padding-top: 5px;
}

.md-fab {
    z-index: 100;
}

.bot-right {
    position: fixed !important;
    bottom: 10px !important;
    right: 15px !important;
}

.available-quests > div > * {
    width: 250px;
    padding: 2px;
}

.selected {
    padding: 0px;
    border: solid 2px #69F0AE;
    border-radius: 2px;
    background-color: #69F0AE;
}
</style>