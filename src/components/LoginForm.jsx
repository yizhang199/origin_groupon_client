import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { login } from "../actions";
import "../css/Form.css";

class LoginForm extends React.Component {
  renderInput = ({ input, placeholder, type }) => {
    return (
      <input
        {...input}
        type="text"
        className="component-form__input"
        placeholder={placeholder}
        type={type}
      />
    );
  };
  onSubmit = formValues => {
    this.props.login();
  };
  render() {
    return (
      <div className="component-form">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">email</i>
              <Field
                name="email"
                component={this.renderInput}
                placeholder="请输入Email"
                type="text"
              />
            </label>
          </div>
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">lock</i>
              <Field
                name="password"
                component={this.renderInput}
                placeholder="请输入密码"
                type="password"
              />
            </label>
          </div>

          <button className="component-form__submit-button">确认</button>
        </form>
      </div>
    );
  }
}
const reduxFormWrapper = reduxForm({ form: "loginForm" })(LoginForm);
export default connect(
  null,
  { login }
)(reduxFormWrapper);
