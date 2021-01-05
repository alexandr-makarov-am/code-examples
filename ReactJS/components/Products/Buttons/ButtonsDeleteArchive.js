import React from "react";
import PropTypes from "prop-types";

export default function ButtonsDeleteArchive({ onClick, disabled, showDeleteBtn }) {
	let btn = "";
	if (showDeleteBtn) {
		btn = <div className={"button-img-block"}>
			<button className={`btnIcon no-color ${disabled && "disabled"} trash"`} onClick={!disabled ? onClick : () => {}}>
				<img src="/assets/img/trash2.svg"/>
			</button>
		</div>;
	}
	return btn;
}
ButtonsDeleteArchive.defaultProps = {
	del: () => {},
	archive: () => {},
};
ButtonsDeleteArchive.propTypes = {
	del: PropTypes.func,
	archive: PropTypes.func,
};
