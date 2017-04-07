import test from 'ava';
import * as types from '../../src/store/mutation-types';
import loginStore from '../../src/store/modules/login';
import nock from 'nock';
import config from '../../config';
import { testAction } from './_helpers';
require('isomorphic-fetch');

test.before(() => {
  nock(config.hostname)
		.persist()
    // Valid request
    .post('/user/authenticate', { username: 'user', password: 'password' })
    .reply(200, { status: 'ok' })
    // Invalid request
    .post('/user/authenticate', { username: 'invalid', password: 'credentials' })
    .reply(401);
});

test('Valid login', async t => {
  await testAction(loginStore.actions.login, { username: 'user', password: 'password' }, {}, [
        { type: types.LOGIN },
        { type: types.LOGIN_SUCCESS }
  ], t);
});
test('Invalid login', async t => {
  await testAction(loginStore.actions.login, { username: 'invalid', password: 'credentials' }, {}, [
        { type: types.LOGIN },
        { type: types.LOGIN_FAILURE, payload: { status: 401, statusText: 'Unauthorized' }}
  ], t);
});

