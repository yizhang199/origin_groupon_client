import React from "react";
import LoginForm from "./LoginForm";
import FormHead from "./FormHead";
import { Head } from "../shared/";
import { connect } from "react-redux";

const Login = props => {
  if (!props.labels.app_head_title) {
    return <div>loading...</div>;
  }
  return (
    <React.Fragment>
      <Head title={props.labels.app_head_title} pageName="login" />
      <div className="component-login">
        <FormHead />
        <LoginForm labels={props.labels} />
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = ({ labels }) => {
  return { labels };
};
export default connect(mapStateToProps)(Login);
