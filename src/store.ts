import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
const storeWindow: any = window;
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    typeof storeWindow === "object" &&
      typeof storeWindow.devToolsExtension !== "undefined"
      ? storeWindow.devToolsExtension()
      : (f: any) => f
  )
);

export default store;
