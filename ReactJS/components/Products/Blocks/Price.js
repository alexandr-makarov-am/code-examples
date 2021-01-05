import React from "react";
import PropTypes from "prop-types";
import { SkeletonBlock } from "../../Skeleton";
import useTranslation from "../../../hooks/useTranslation";

export default function Price({
	discount, price, currency, className,
}) {
	const { t } = useTranslation();
	const oldPrice = (currentPrice, discountValue) => {
		const delta = 100;
		return (currentPrice * delta) / (delta - discountValue);
	};
	const formatter = new Intl.NumberFormat("ru-RU");
	return <span className={className}>
		<SkeletonBlock className="block-text">
			{ discount
				&& <span className="old">{formatter.format(oldPrice(price, discount))}</span>
			}
			<meta itemProp="price" content={Number.isInteger(price) ? price : 0}/>
			<meta itemProp="priceCurrency" content={currency}/>
			<span className="current" style={{ color: discount && "#FF383E" }}>
				{ !price ? t("price_null") : formatter.format(price) }
				<span className="currency">&nbsp;{Math.round(price) > 0 && currency}</span>
			</span>
		</SkeletonBlock>
	</span>;
}

Price.propTypes = {
	className: PropTypes.string,
};

Price.defaultProps = {
	className: "cost",
};
