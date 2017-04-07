<template>
    <div id="quest-list">
        <div class="available-quests">
            <quest v-for="(quest, index) in questOffers"
                   v-bind:item="quest"
                   v-on:select="select"
                   :key="index"
                   :in-progress="true"></quest>
        </div>
        <ul>
            <quest v-for="(quest,index) in quests"
                   v-bind:item="quest"
                   :key="index"
                   :in-progress="false"></quest>
        </ul>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'quest-list',
    data() {
        return { quests: new Array(0), questOffers: new Array(0), selectedQuest: -1 };
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
        getQuests() {
            return fetch('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=').then((res) => {
                return res.json();
            }).then((data) => {
                var champions = data.data;
                var championKeys = Object.keys(champions);
                for (var i = 0; i < championKeys.length / 12; i++) {
                    if (Math.random() > .75)
                        this.quests.push({ title: champions[championKeys[i]].name + " Mastery", champion: champions[championKeys[i]].key, detail: "Get 300 kills as " + champions[championKeys[i]].name, progress: 300, goal: 300, isCompleted: true });
                    else
                        this.quests.push({ title: champions[championKeys[i]].name + " Mastery", champion: champions[championKeys[i]].key, detail: "Get 300 kills as " + champions[championKeys[i]].name, progress: Math.floor(Math.random() * 300), goal: 300, isCompleted: false });
                }
                this.questOffers.push(this.quests[1]);
                this.questOffers.push(this.quests[2]);
                this.questOffers.push(this.quests[4]);
                this.questOffers[0].isCompleted = false;
                this.questOffers[1].isCompleted = false;
                this.questOffers[2].isCompleted = false;
            });
        }
    },
    created() {
        this.getQuests();
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