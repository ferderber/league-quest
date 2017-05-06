import test from 'ava';
import * as types from '../../src/store/mutation-types';
import store from '../../src/store/modules/quests';
import nock from 'nock';
import config from '../../config';
import { testAction } from './_helpers';

const actions = store.actions;
const mutations = store.mutations;
const getters = store.getters;
const state = store.state;
let testState = state;
process.env.API_URL = config.hostname;
const mockRoutes = nock(config.hostname);
const quests = [{
  'id': 1,
  'title': 'Riven Mastery',
  'championId': 92,
  'championKey': 'Riven',
  'championName': 'Riven',
  'type': 0,
  'points': 20,
  'complete': false,
  'objectives': [
    {
      'progress': 0,
      'goal': 100,
      'goalType': 0,
      'title': 'Kills'
    }
  ]
},
{
  'id': 2,
  'title': "Cho'Gath Mastery",
  'championId': 31,
  'championKey': 'Chogath',
  'championName': "Cho'Gath",
  'type': 0,
  'points': 20,
  'complete': false,
  'objectives': [
    {
      'progress': 0,
      'goal': 100,
      'goalType': 0,
      'title': 'Kills'
    }
  ]
}];

// action tests
test('Valid getQuests', async t => {
  mockRoutes.get('/quest').reply(200, quests);
  await testAction(actions.getQuests, null, {}, [
        { type: types.UPDATE_QUESTS, payload: quests }
  ], null, t);
});
test('Valid acceptQuest', async t => {
  mockRoutes.post('/quest/1/accept').reply(200, quests[0]);
  await testAction(actions.acceptQuest, quests[0], {}, [
        { type: types.ACCEPT_QUEST, payload: quests[0] }
  ], null, t);
});

test('Offline getQuests', async (t) => {
  mockRoutes.get('/quest').reply(401);
  await testAction(actions.getQuests, null, {}, [
        { type: types.API_ERROR, payload: { status: 401, statusText: 'Unauthorized' }}
  ], null, t);
});
test('Offline acceptQuests', async (t) => {
  mockRoutes.post('/quest/1/accept').reply(401);
  await testAction(actions.acceptQuest, quests[0], {}, [
        { type: types.API_ERROR, payload: { status: 401, statusText: 'Unauthorized' }}
  ], null, t);
});

test.beforeEach(() => {
  testState = state;
});

// mutation/getter tests
test('Initial getters should be empty', async t => {
  t.deepEqual(getters.activeQuests(testState), []);
  t.deepEqual(getters.completedQuests(testState), []);
  t.deepEqual(getters.questOffers(testState), []);
});
test('ACCEPT_QUEST mutation', async t => {
  mutations[types.ACCEPT_QUEST](testState, quests[0]);
  t.deepEqual(getters.activeQuests(testState), [quests[0]], 'Should have one quest active after mutation');
  t.deepEqual(getters.completedQuests(testState), []);
  t.deepEqual(getters.questOffers(testState), []);
});

test('UPDATE_QUESTS mutation', async t => {
  mutations[types.UPDATE_QUESTS](testState, quests);
  t.deepEqual(getters.activeQuests(testState), quests, 'Should have all quests active after mutation');
  t.deepEqual(getters.completedQuests(testState), []);
  t.deepEqual(getters.questOffers(testState), []);
});
