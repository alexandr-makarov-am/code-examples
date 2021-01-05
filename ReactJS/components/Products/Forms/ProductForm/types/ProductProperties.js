import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useField from "../../../../Form/hooks/useField";
import api from "../../../../../api";
import Select from "../../../../Form/types/Select";
import useTranslation from "../../../../../hooks/useTranslation";

export default function ProductProperties({ relationField, onChange }) {
	const { t } = useTranslation();
	const { fieldValue } = useField(relationField);
	const [filters, setFilters] = useState([]);
	useEffect(() => {
		if (fieldValue) {
			setFilters([]);
			api.category(fieldValue.slug).then((result) => {
				setFilters(result.filters);
				onChange(result.filters);
			});
		} else {
			setFilters([]);
		}
	}, [fieldValue]);
	return <>
		{filters.length > 0
			&& <div className="select-block">
				<div className="header-block mt40">
					<div className="header-small">{t("add_goods_cat_window_item_property")}</div>
				</div>
				<div className="select-3">
					{filters.map(({
						options, id, isShowOnProductCreate, title, group,
					}) => (
						isShowOnProductCreate && options.length > 0 && <div key={id}>
							<Select
								name={group ? `${group}[${id}]` : id}
								placeholder={title}
								options={options.map((opt) => ({
									title: opt.title,
									id: opt.id,
								}))}
								transformer={(values) => (values && typeof values === "object" ? [values.id] : values)}
							/>
						</div>
					))}
				</div>
			</div>
		}
	</>;
}

ProductProperties.onChange = {
	onChange: PropTypes.func,
};

ProductProperties.defaultProps = {
	onChange: () => {},
};
