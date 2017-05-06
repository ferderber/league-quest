<template>
  <md-table-card id="leaderboard">
    <md-toolbar>
      <h1 class="md-title">Leaderboard</h1>
      <md-button class="md-icon-button">
        <md-icon>filter_list</md-icon>
      </md-button>

      <md-button class="md-icon-button">
        <md-icon>search</md-icon>
      </md-button>
    </md-toolbar>

    <md-table md-sort="points" @sort="onSort">
      <md-table-header>
        <md-table-row>
          <md-table-head md-sort-by="summonerName">Username</md-table-head>
          <md-table-head md-sort-by="points" md-numeric md-tooltip="Total points from all of the users completed quests">Points</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(row, rowIndex) in filteredStats" :key="rowIndex" :md-item="row">
          <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :md-numeric="columnIndex !== 'username'" v-if="columnIndex !== 'level'">
            {{ column }}
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>

    <md-table-pagination
      :md-size="size"
      :md-total="stats.length"
      :md-page="page"
      md-label="Rows"
      md-separator="of"
      :md-page-options="[5, 10, 25, 50]"
      @pagination="onPagination"></md-table-pagination>
  </md-table-card>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
    name: 'leaderboard',
    methods: {
      onPagination: function(data) {
        this.$store.dispatch('page', data);
      },
      onSort: function(data) {
        this.$store.dispatch('sort', data);
      }
    },
    computed: {
      ...mapGetters(['stats', 'length', 'filteredStats', 'page', 'size'])
    },
    mounted: function () {
        this.$store.dispatch('getStats');
    }
}
</script>
<style>
#leaderboard {
  max-width: 550px;
  margin: auto;
}
</style>
