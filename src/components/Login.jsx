import React from "react";
import LoginForm from "./LoginForm";
import FormHead from "./FormHead";
import Head from "./Head";
const Login = () => {
  return (
    <React.Fragment>
      <Head title="天府川菜馆" pageName="login" />
      <div className="component-login">
        <FormHead />
        <LoginForm />
      </div>
    </React.Fragment>
  );
};

export default Login;
