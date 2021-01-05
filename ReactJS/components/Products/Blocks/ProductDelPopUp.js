import React from "react";
import useTranslation from "../../../hooks/useTranslation";

export default function ProductDelPopUp(props) {
	const {
		onDelete, onCancel, img, deltext,
	} = props;
	const { t } = useTranslation();
	return <div className="addGoods productDelPopUp">
		<div className="popUp">
			<div className="img-block">
				<img src={img || "/assets/img/arhive_black.svg"}/>
				<div className="text-block">
					<div className="del-text">{deltext || t("product_del_popup_arhive")}</div>
				</div>
				<div className="button-block">
					<button onClick={onCancel}>{t("product_del_popup_cancel")}</button>
					<button onClick={onDelete}>{t("product_del_popup_yes")}</button></div>
			</div>
		</div>
	</div>;
}
