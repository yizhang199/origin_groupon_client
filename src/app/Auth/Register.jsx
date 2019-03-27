import React from "react";
import { connect } from "react-redux";

import FormHead from "./FormHead";
import RegisterForm from "./RegisterForm";
import { Head } from "../shared/";

const Register = props => {
  if (!props.labels.app_head_title) {
    return <div>loading...</div>;
  }
  return (
    <React.Fragment>
      <Head title={props.labels.app_head_title} pageName="register" />
      <div className="component-register">
        <FormHead />
        <RegisterForm labels={props.labels} />
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = ({ labels }) => {
  return { labels };
};
export default connect(mapStateToProps)(Register);
