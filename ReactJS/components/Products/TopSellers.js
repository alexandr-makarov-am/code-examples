import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Seller from "./Blocks/Seller";
import useTranslation from "../../hooks/useTranslation";
import api from "../../api";
import AppContext from "../../contexts/AppContext";

export default function TopSellers({ title, href }) {
	const { t } = useTranslation();
	const [sellers, setSellers] = useState([]);
	const { store: { headerState: { isFocused } } } = useContext(AppContext);
	useEffect(() => {
		api.getTopSellers().then((data) => setSellers(data));
	}, []);
	return <div className={`sellersBlock ${isFocused ? "isFocused" : ""}`}>
		<div className="head">
			<span className="secCap">{title}</span>
			{ href
				&& <a href={href} className="linkType5">{t("top_sellers_view_all")}</a>
			}
		</div>
		<div className="content">
			<ul className="sellersList">
				{sellers.map((seller, index) => (
					<li key={index}>
						<Seller {...seller} />
					</li>
				))}
			</ul>
		</div>
	</div>;
}

TopSellers.propTypes = {
	title: PropTypes.string,
	href: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.object),
};

TopSellers.defaultProps = {
	title: "Top sellers",
	data: [{}, {}, {}],
};
