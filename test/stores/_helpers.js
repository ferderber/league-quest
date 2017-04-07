
// Helper for testing action with expected mutations
export async function testAction (action, payload, state, expectedMutations, t) {
  let count = 0;
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

  // call the action with mocked data
  await action({ commit, state }, payload);

  if (expectedMutations.length === 0) {
    t.is(count, 0, 'Mutations commited when none were expected');
  }
};
