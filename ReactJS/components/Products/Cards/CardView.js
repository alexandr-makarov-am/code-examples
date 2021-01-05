import React from "react";
import PropTypes from "prop-types";
import BaseCard from "./BaseCard";
import ProductInformation from "../Blocks/ProductInformation";
import ProductInfo from "../Blocks/ProductInfo";
import AddToBasket from "../Buttons/AddToBasket";
import Seller from "../Blocks/Seller";
import ProductDiscount from "../Blocks/ProductDiscount";

export default function CardView(props) {
	const { discount, showSeller, user } = props;
	return <BaseCard
		productProps={props}
		head={(showSeller && <Seller {...user} />)}
		left={(<ProductInfo {...props} />)}
		right={(<AddToBasket {...props}/>)}>
		<ProductInformation {...props}>
			{ discount && <ProductDiscount {...props} /> }
		</ProductInformation>
	</BaseCard>;
}

CardView.propTypes = {
	showSeller: PropTypes.bool,
};

CardView.defaultProps = {
	showSeller: true,
};
