
// Helper for testing action with expected mutations
  module.exports = { testAction: async function (action, payload, state, expectedMutations, expectedActions, t) {
    let count = 0;
    let actionCount = 0;
  // mock commit
    const commit = (type, payload) => {
      const mutation = expectedMutations[count];
      t.is(mutation.type, type, 'Mutation types should be the same');
      if (payload) {
        t.deepEqual(mutation.payload, payload, 'Payloads should be equal');
      }
      count++;
      t.truthy(count <= expectedMutations.length, 'More mutations commited than expected');
    };
  // mock dispatch
    const dispatch = (action) => {
      const expectedAction = expectedActions[actionCount];
      t.is(expectedAction, action, 'Dispatched actions should be the same');
      actionCount++;
      t.truthy(actionCount <= expectedActions.length, 'More actions dispatched than expected');
    };

  // call the action with mocked data
    await action({ dispatch, commit, state }, payload);

    if (expectedMutations.length === 0) {
      t.is(count, 0, 'Mutations commited when none were expected');
    }
  },
   // Storage Mock
    storageMock: function storageMock () {
      var storage = {};

      return {
        setItem: function (key, value) {
          storage[key] = value || '';
        },
        getItem: function (key) {
          return key in storage ? storage[key] : null;
        },
        removeItem: function (key) {
          delete storage[key];
        },
        get length () {
          return Object.keys(storage).length;
        },
        key: function (i) {
          var keys = Object.keys(storage);
          return keys[i] || null;
        }
      };
    }
  };
