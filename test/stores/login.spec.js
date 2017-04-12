import test from 'ava';
import * as types from '../../src/store/mutation-types';
import loginStore from '../../src/store/modules/login';
import nock from 'nock';
import config from '../../config';
import { testAction } from './_helpers';
require('isomorphic-fetch');

const mockRoutes = nock(config.hostname);
const mutations = loginStore.mutations;
const actions = loginStore.actions;
const state = loginStore.state;
const getters = loginStore.getters;
let testState = loginStore.state;

// action tests
test('Valid login', async t => {
  mockRoutes.post('/user/authenticate', { username: 'user', password: 'password' }).reply(200, { status: 'ok' });
  await testAction(actions.login, { username: 'user', password: 'password' }, {}, [
        { type: types.LOGIN },
        { type: types.LOGIN_SUCCESS }
  ], null, t);
});
test('Invalid login', async t => {
  mockRoutes.post('/user/authenticate', { username: 'invalid', password: 'credentials' }).reply(401);
  await testAction(actions.login, { username: 'invalid', password: 'credentials' }, {}, [
        { type: types.LOGIN },
        { type: types.LOGIN_FAILURE },
        { type: types.SHOW_NOTIFICATION, payload: { status: 401, statusText: 'Unauthorized' }}
  ], ['showNotification'], t);
});

test('Logout', async t => {
  await testAction(actions.logout, null, {}, [
    { type: types.LOGOUT }
  ], null, t);
});

// mutation tests
test.beforeEach('Reset testState', () => {
  testState = state;
});
test('LOGIN mutation', async t => {
  mutations[types.LOGIN](testState);
  t.is(getters.isLoggedIn(testState), false);
  t.is(getters.pending(testState), true);
});
test('LOGIN_SUCCESS mutation', async t => {
  mutations[types.LOGIN_SUCCESS](testState);
  t.is(getters.isLoggedIn(testState), true);
  t.is(getters.pending(testState), false);
});
test('LOGOUT mutation', async t => {
  mutations[types.LOGOUT](testState);
  t.is(getters.isLoggedIn(testState), false);
  t.is(getters.pending(testState), false);
});
test('LOGIN_FAILURE mutation', async t => {
  mutations[types.LOGIN_FAILURE](testState);
  t.is(getters.isLoggedIn(testState), false);
  t.is(getters.pending(testState), false);
});
