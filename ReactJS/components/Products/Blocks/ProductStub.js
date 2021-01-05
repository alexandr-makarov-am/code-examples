import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { SkeletonBlock } from "../../Skeleton";
import useTranslation from "../../../hooks/useTranslation";

export default function ProductStub({ setFullList, items }) {
	const { t } = useTranslation();
	return <div className="productCard">
		<div className="head"></div>
		<div className="content">
			<div className="img">
				<img src="/assets/img/product_stub.png" alt="product" />
				<div className="moreInfo lastItem">
					<div className="count">{items}</div>
					<Link href="/product/[slug]" as={"/product/"}>
						<a className="title" onClick={setFullList}>{t("seller_products_count")}</a>
					</Link>
				</div>
				<SkeletonBlock />
			</div>
		</div>
	</div>;
}

ProductStub.propTypes = {
	setFullList: PropTypes.func,
	items: PropTypes.number,
};

ProductStub.defaultProps = {
	setFullList: () => {},
	items: 7,
};
