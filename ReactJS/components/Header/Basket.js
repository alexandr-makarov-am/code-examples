import React, { useContext } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import AppContext from "../../contexts/AppContext";

export default function Basket({ currency, closeSidebar }) {
	const { store: { basket } } = useContext(AppContext);
	const price = basket.map((item) => (item.price ? parseFloat(item.price) : item.price));
	const formatter = new Intl.NumberFormat("ru-RU");
	return <Link href="/basket" as={"/basket"}>
		<a className="basketBlock" onClick={closeSidebar}>
			<span className="sum">
				{ price.length > 0 ? formatter.format(price.reduce((a, b) => a + b)) : 0}
			&nbsp;
				<span className="cur">{currency}</span>
			</span>
			<span className="dashLine" />
			<span className="num">{basket.length}</span>
		</a>
	</Link>;
}

Basket.propTypes = {
	cost: PropTypes.string,
	currency: PropTypes.string,
};
