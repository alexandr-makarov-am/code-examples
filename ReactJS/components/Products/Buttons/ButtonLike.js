import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";
import { addToFavorites, removeFromFavorites } from "../../../reducers/appReducer";

export default function ButtonLike(props) {
	const { id } = props;
	const { dispatch, store } = useContext(AppContext);
	const isFavorite = store.favorites.filter((p) => p.id === props.id).length > 0;

	const addItemToFavorites = (e) => {
		e.stopPropagation();
		dispatch(!isFavorite
			? addToFavorites([props]) : removeFromFavorites([id]));
	};
	return <span className="favorite">
		<button onClick={(e) => addItemToFavorites(e)}>
			<span className={ isFavorite ? "icon-like" : "icon-unlike" }></span>
		</button>
	</span>;
}
ButtonLike.propTypes = {
	isFavorite: PropTypes.bool,
	addItemToFavorites: () => {},
};
ButtonLike.defaultProps = {
	isFavorite: PropTypes.bool,
	addItemToFavorites: () => {},
};
