import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import "./index.scss";
import createHistory from "history/createBrowserHistory";
import { App } from "./components";
import { compose, createStore, applyMiddleware } from "redux";
import GameReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const history = createHistory();

const middlewareHistory = routerMiddleware(history); //Investigate why this is causing a createStore issue

const middleware = [applyMiddleware(thunk), middlewareHistory];
const enhancer = composeWithDevTools(applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={createStore(GameReducer, enhancer)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
