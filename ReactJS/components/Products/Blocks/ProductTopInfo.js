import React from "react";
import PropTypes from "prop-types";

export default function ProductTopInfo({ createdAt, viewCount }) {
	return <div className="top-info">
		<div className="time">{createdAt}</div>
		<div className="views">
			<img src="/assets/img/view.svg"/>
			<div className="views-text">{viewCount}</div>
		</div>
	</div>;
}
ProductTopInfo.defaultProps = {
	time: "post was publicate 3 days ago",
	views: "923",
	likes: "111",
};
ProductTopInfo.propTypes = {
	time: PropTypes.string,
	views: PropTypes.string,
	likes: PropTypes.string,
};
