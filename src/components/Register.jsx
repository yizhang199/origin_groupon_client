import React from "react";
import FormHead from "./FormHead";
import RegisterForm from "./RegisterForm";
import Head from "./Head";
const Register = () => {
  return (
    <React.Fragment>
      <Head title="天府川菜馆" pageName="register" />
      <div className="component-register">
        <FormHead />
        <RegisterForm />
      </div>
    </React.Fragment>
  );
};

export default Register;
