import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";
import { addToBasket, removeFromBasket } from "../../../reducers/appReducer";
import { SkeletonBlock } from "../../Skeleton";

export default function AddToBasket(props) {
	const { dispatch, store: { basket } } = useContext(AppContext);
	const isBought = basket.filter((p) => p.id === props.id).length > 0;
	const addItemToBasket = () => {
		dispatch(!isBought
			? addToBasket([props]) : removeFromBasket(props.id));
	};
	return <Fragment>
		<SkeletonBlock className="btn-addcart">
			<button
				className={`btnIcon ${isBought ? "added" : ""}`}
				onClick={addItemToBasket}
			>
				<span className="icon-addcart"></span>
			</button>
		</SkeletonBlock>
	</Fragment>;
}
AddToBasket.propTypes = {
	props: PropTypes.object,
};
AddToBasket.defaultProps = {
	props: {},
};
