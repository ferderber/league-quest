import test from 'ava';
import * as types from '../../src/store/mutation-types';
import questStore from '../../src/store/modules/quests';
import nock from 'nock';
import config from '../../config';
import { testAction } from './_helpers';
require('isomorphic-fetch');

const quests = [{ data: 'test', other: 'test' }];

test.before(() => {
  nock(config.hostname)
    .persist()
    // Valid request
    .get('/quests')
    .reply(200, quests)
    // Valid quest accept
    .post('/quests/1/accept')
    .reply(200, quests[0]);
});

test('Valid getQuests', async t => {
  await testAction(questStore.actions.getQuests, null, {}, [
        { type: types.UPDATE_QUESTS, payload: quests }
  ], null, t);
});
test('Valid acceptQuest', async t => {
  await testAction(questStore.actions.acceptQuest, 1, {}, [
        { type: types.ACCEPT_QUEST, payload: quests[0] }
  ], null, t);
});

