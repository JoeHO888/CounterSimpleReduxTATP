import React from "react";
import ReactDOM from "react-dom";
import CounterGroup from "./component/CounterGroup";
import reducer from "./reducer";
import {createStore} from "redux";
import { Provider } from "react-redux";

// if action in CounterGroup want to dispath action from component to ./reducer
// we need creat a store by pass our customized reducer
// and pass this store to Provider, we need to that to connect react and redux so reducer can manage the state and trigger react component render() after state change
const store = createStore(reducer);



ReactDOM.render(
  <Provider store={store}> 
    <CounterGroup defaultCount="3" />
  </Provider>,
  document.getElementById("root")
);
