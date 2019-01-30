import React from "react";
import { Field, reduxForm } from "redux-form";

class LoginForm extends React.Component {
  renderInput = ({ input, placeholder }) => {
    console.log(input);
    return <input {...input} type="text" placeholder={placeholder} />;
  };
  render() {
    return (
      <div className="component-form">
        <form>
          <Field
            name="email"
            component={this.renderInput}
            placeholder="请输入Email"
          />
          <Field
            name="password"
            component={this.renderInput}
            placeholder="请输入密码"
          />
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: "loginForm" })(LoginForm);
