import { compose, createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import GameReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore() {
  const history = createHistory();

  const middlewareHistory = routerMiddleware(history);

  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const middleware = [applyMiddleware(thunk), middlewareHistory];
  console.log(GameReducer);

  const enhancer = compose(applyMiddleware(...middleware));

  return createStore(GameReducer);
}
