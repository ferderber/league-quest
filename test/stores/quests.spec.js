import test from 'ava';
import * as types from '../../src/store/mutation-types';
import store from '../../src/store/modules/quests';
import nock from 'nock';
import config from '../../config';
import { testAction } from './_helpers';
require('isomorphic-fetch');

const mockRoutes = nock(config.hostname);
const actions = store.actions;
const mutations = store.mutations;
const getters = store.getters;
const state = store.state;
let testState = state;
const quests = [{ id: 1, active: true, champion: '', goal: 300, progress: 0 }];

// action tests
test('Valid getQuests', async t => {
  mockRoutes.get('/quests').reply(200, quests);
  await testAction(actions.getQuests, null, {}, [
        { type: types.UPDATE_QUESTS, payload: quests }
  ], null, t);
});
test('Valid acceptQuest', async t => {
  mockRoutes.post('/quests/1/accept').reply(200, quests[0]);
  await testAction(actions.acceptQuest, quests[0].id, {}, [
        { type: types.ACCEPT_QUEST, payload: quests[0] }
  ], null, t);
});

test('Offline getQuests', async (t) => {
  mockRoutes.get('/quests').reply(401);
  await testAction(actions.getQuests, null, {}, [
        { type: types.API_ERROR, payload: { status: 401, statusText: 'Unauthorized' }}
  ], null, t);
});
test('Offline acceptQuests', async (t) => {
  mockRoutes.post('/quests/1/accept').reply(401);
  await testAction(actions.acceptQuest, quests[0].id, {}, [
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
