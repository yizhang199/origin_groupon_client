import React from "react";
import LoginForm from "./LoginForm";
import FormHead from "./FormHead";

const Login = () => {
  return (
    <div className="component-login">
      <FormHead pathname="login" />
      <LoginForm />
    </div>
  );
};

export default Login;
