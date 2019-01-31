import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Head from "./Head";
import Products from "./Products";
import Confirm from "./Confirm";
import Payment from "./Payment";

import Login from "./Login";
import Register from "./Register";

import "../css/App.css";

const App = () => {
  return (
    <div className="component-app">
      <Router>
        <React.Fragment>
          <Head title="天府川菜馆" />
          <Route exact path={`/products`} component={Products} />
          <Route exact path={`/confirm`} component={Confirm} />
          <Route exact path={`/payment`} componete={Payment} />
          <Route exact path={`/login`} component={Login} />
          <Route exact path={`/register`} component={Register} />
          <Route exact path={`/`} component={Products} />
        </React.Fragment>
      </Router>
    </div>
  );
};

export default App;
