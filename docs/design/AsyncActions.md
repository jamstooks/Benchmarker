# Async Actions

Redux supplies a [pattern](https://redux.js.org/advanced/async-actions)
for running async actions.

It's a pretty simple process:

1. Dispatch a "starting" action
2. Run the async action
3. Dispatch an "ending" action (error or success)

We have decoupled the actions themselves from the fetch process
with the `Connector`. This means that async methods generally
look like this:

    export function runSearch(filters) {
      return function(dispatch) {
        dispatch(startSearch(filters));
        return Connector.getFilteredInstitutions(filters).then(entities =>
          dispatch(receiveSearch(entities))
        );
      };
    }

The actual logic of `fetch`ing data is left to the connector.
