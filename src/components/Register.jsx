import React from "react";
import FormHead from "./FormHead";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="component-register">
      <FormHead pathname="register" />
      <RegisterForm />
    </div>
  );
};

export default Register;
