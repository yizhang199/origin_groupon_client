import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { register } from "../../_actions";
// import "../css/Form.css";

class RegisterForm extends React.Component {
  renderInput = ({ input, placeholder, type }) => {
    return (
      <input
        {...input}
        type={type}
        className="component-form__input"
        placeholder={placeholder}
      />
    );
  };
  onSubmit = formValues => {
    this.props.register();
  };
  render() {
    return (
      <div className="component-form">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">account_circle</i>
              <Field
                name="username"
                component={this.renderInput}
                placeholder="请输入用户名"
                type="text"
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
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">lock</i>
              <Field
                name="repeat_password"
                component={this.renderInput}
                placeholder="请再次输入密码"
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

const reduxFormWrapper = reduxForm({ form: "registerForm" })(RegisterForm);
export default connect(
  null,
  { register }
)(reduxFormWrapper);
