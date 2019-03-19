import React from "react";
import { connect } from "react-redux";

import { changeCustomerComments } from "../../_actions";

const CustomerCommentsSection = ({
  customerComments,
  changeCustomerComments
}) => {
  const handleCustomerComments = e => {
    changeCustomerComments(e.target.value);
  };

  return (
    <div className="payment-section">
      <textarea
        onChange={handleCustomerComments}
        value={customerComments}
        className="component-confirm__customer-comments"
      />
    </div>
  );
};

const mapStateToProps = ({ customerComments }) => {
  return { customerComments };
};

export default connect(
  mapStateToProps,
  { changeCustomerComments }
)(CustomerCommentsSection);
