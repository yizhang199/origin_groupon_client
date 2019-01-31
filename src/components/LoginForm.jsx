import React from "react";
import { Field, reduxForm } from "redux-form";

import "../css/Form.css";

class LoginForm extends React.Component {
  renderInput = ({ input, placeholder, label }) => {
    return (
      <input
        {...input}
        type="text"
        className="component-form__input"
        placeholder={placeholder}
      />
    );
  };
  render() {
    return (
      <div className="component-form">
        <form>
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">account_circle</i>
              <Field
                name="username"
                component={this.renderInput}
                placeholder="请输入用户名"
              />
            </label>
          </div>
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">email</i>
              <Field
                name="email"
                component={this.renderInput}
                placeholder="请输入Email"
              />{" "}
            </label>
          </div>
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">lock</i>
              <Field
                name="password"
                component={this.renderInput}
                placeholder="请输入密码"
              />
            </label>
          </div>
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">lock</i>
              <Field
                name="repeat_password"
                component={this.renderInput}
                placeholder="请再次输入密码"
              />
            </label>
          </div>
          <button className="component-form__submit-button">确认</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: "loginForm" })(LoginForm);
