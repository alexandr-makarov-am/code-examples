import React from "react";
import PropTypes from "prop-types";

export default function ProductDiscount({ discount }) {
	return <span className="badge">{discount}%</span>;
}
ProductDiscount.propTypes = {
	discount: PropTypes.number,
};
ProductDiscount.defaultProps = {
	discount: 50,
};
