import React from "react";
import PropTypes from "prop-types";

export default function Banner({
	category, title, subtitle, href, imageUrl,
}) {
	return <div className="menuBanner">
		<div className="siteBanner">
			<img src={imageUrl} alt="banner" className="backImg" />
			<div className="category">
				<span className="fourthCap invert">{category}</span>
			</div>
			<div className="content">
				<div className="title">
					<span className="firstCap invert">{title}</span>
				</div>
				<div className="subtitle">
					<span className="systemText invert">{subtitle}</span>
				</div>
				<span className="icon-arrow invert" />
			</div>
		</div>
		<a href={href}>banner link</a>
	</div>;
}

Banner.propTypes = {
	category: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	href: PropTypes.string,
	imageUrl: PropTypes.string,
};
