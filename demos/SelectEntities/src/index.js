import React from "react";
import { render } from "react-dom";
import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";

import { selectedEntitiesReducers } from "../../../src/reducers";
import SelectEntities from "../../../src/containers/SelectEntities";

const loggerMiddleware = createLogger();

const store = createStore(
  combineReducers(selectedEntitiesReducers),
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

render(
  <Provider store={store}>
    <SelectEntities />
  </Provider>,
  document.getElementById("root")
);
