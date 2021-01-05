import React from "react";
import PropTypes from "prop-types";

export default function Banner(props) {
	const {
		image, textBackgroundImage, title, subtitle, category, href,
	} = props;
	return <div className="catalogBanner">
		<div className="wrap">
			<div className="siteBanner">
				<img src={textBackgroundImage} alt="catalog" className="backImg" />
				<div className="lines">
					<svg viewBox="0 0 126 144" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="5.10607" height="143.423" fill="#FF383E" />
						<rect x="31.7715" width="10.7795" height="143.423" fill="#FF383E" />
						<rect x="63.5425" width="21.559" height="143.423" fill="#FF383E" />
						<rect x="99.2847" width="26.665" height="143.423" fill="#FF383E" />
					</svg>
				</div>
				<div className="category">
					<span className="fourthCap">{category}</span>
				</div>
				<div className="content">
					<div className="title">
						<span className="firstCap">{title}</span>
					</div>
					<div className="subtitle">
						<span className="systemText">{subtitle}</span>
					</div>
					<span className="icon-arrow"></span>
				</div>
			</div>
		</div>
		<img src={image} alt="catalog" className="backImg" />
		<a href={href}>link</a>
	</div>;
}

Banner.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	image: PropTypes.string,
	category: PropTypes.string,
	href: PropTypes.string,
	textBackgroundImage: PropTypes.string,
};

Banner.defaultProps = {
	title: "Banner title",
	subtitle: "Banner subtitle",
	image: "/assets/img/catalog_img.jpg",
	category: "Banner category",
	href: "#banner",
	textBackgroundImage: "/assets/img/siteBanner_back.svg",
};
