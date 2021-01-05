import React from "react";
import useTranslation from "../../../../../hooks/useTranslation";
import useErrors from "../../../../Form/hooks/useErrors";

export default function SelectType({
	category, key, className, onChange, id, name,
}) {
	const { t } = useTranslation();
	const { errors } = useErrors("category");
	return 	<span className={`form-input ${className} ${errors ? "error" : ""}`}>
		<select
			name={name}
			className="select clothes-type"
			value={category.value}
			key={key}
			onChange={onChange}>
			<option value={""}>{t(id === 1 ? "add_goods_select_category" : "add_goods_select_subcategory")}</option>
			{category.options.map((option, k) => (
				<option value={option.id} key={k}>{option.title}</option>
			))}
		</select>
	</span>;
}
