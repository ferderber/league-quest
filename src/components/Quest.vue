<template>
    <div id="quest" @click="select">
        <span class="check">
            <svg v-if="item.completed" fill="#000000" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        </span>
        <div v-bind:class="{completed: item.completed}">
            <div class="quest-content">
                <div class="quest-title">{{item.title}}</div>
                <div v-for="(objective, index) in item.objectives" class="objective">
                    <span class="detail">{{objective.title}}</span>
                    <span v-if="!item.completed" class="progress">{{objective.progress}} / {{objective.goal}}</span>
                    <div v-if="!item.completed" class="progress-bar">
                        <span class="progress-fill" :style="{width: (objective.progress / objective.goal) * 100 + '%'}">&nbsp;</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="quest-image" v-bind:style="{ backgroundImage: 'url(' + championImageUrl + ')'}">
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'quest',
    props: ['item', 'inProgress'],
    methods: {
        enter: function (el, done) {
            el.style.width = "0";
            el.style.transition = "width 800ms ease";
            setTimeout(function () {
                el.style.width = this.progressWidth;
                done();
            }.bind(this), 2);
        },
        select() {
            this.$emit('select', this.$el);
        }
    },
    computed: {
        championImageUrl: function () {
            return '//ddragon.leagueoflegends.com/cdn/img/champion/splash/' + this.item.championKey + '_0.jpg';
        },
        progressWidth: function () {
            return Math.floor(this.item.progress / 3) + '%';
        },
        progress: function () {
            let progress = 0;
            for (var i = 0; i < this.item.objectives.length; i++) {
                const objective = this.item.objectives[i];
                progress += objective[i].progress / objective[i].goal;
            }
            progress = progress / this.item.objectives.length;
            return progress;
        }
    },
    created() {
    }
}

</script>
<style>
#quest {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    min-width: 100px;
    position: relative;
    margin: auto;
    margin-top: .3em;
    box-shadow: 2px 2px 2px #888888;
    border-radius: 2px;
    font-weight: 600;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    cursor: pointer;
}
.progress-fill {
    display: block; 
    height: 100%; 
    animation: expandWidth 2s infinite; 
    background-color: #69F0AE;
}

@keyframes expandWidth {
   0% { width: 0; }
}

.progress-bar {
    height: 15px;
    width: 100%;
    background-color: white;
    border-radius: 2px;
}

.progress-fill {
    background-color: #69F0AE;
    border-radius: 2px;
    animation: expandWidth 1s ease 1;
}

.el-progress {
    margin-left: auto;
}

#quest>div {
    flex: 1 1 auto;
}

.check {
    flex: 1 1 auto;
    position: absolute;
    margin: auto;
    z-index: 11;
    opacity: .75;
}

.completed>.quest-content {
    opacity: .8;
    background-color: rgba(200, 200, 200, 0.4);
}

.quest-content {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 15px;
    padding-top: 10px;
    padding-bottom: 5px;
    color: #fff;
    z-index: 10;
    position: relative;
    overflow: hidden;
}

.quest-image {
    z-index: 5;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: .8;
    z-index: 1;
    background-image: url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg');
    background-repeat: no-repeat;
    -ms-background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
    background-size: cover;
}

.quest-title {
    display: block;
    margin-bottom: 30px;
    font-size: 1.2em;
}

.progress {
    margin-top: 0px;
    float: right;
    text-align: right;
}

.objective {
    margin-top: 15px;
}
</style>