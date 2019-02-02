import React from "react";
import { Route, Router } from "react-router-dom";

import Head from "./Head";
import Products from "./Products";
import Confirm from "./Confirm";
import Account from "./Account";
import { history } from "../history";
import { PrivateRoute } from "../PrivateRoute";

import Login from "./Login";
import Register from "./Register";

import "../css/App.css";

const App = () => {
  return (
    <div className="component-app">
      <Router history={history}>
        <React.Fragment>
          <Route exact path={`/products`} component={Products} />
          <Route exact path={`/confirm`} component={Confirm} />
          <PrivateRoute exact path={`/account`} component={Account} />
          <Route exact path={`/login`} component={Login} />
          <Route exact path={`/register`} component={Register} />
          <Route exact path={`/`} component={Products} />
        </React.Fragment>
      </Router>
    </div>
  );
};

export default App;
