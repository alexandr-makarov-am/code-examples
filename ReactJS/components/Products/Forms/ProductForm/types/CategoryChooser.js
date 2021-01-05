import React, {
	useContext, useEffect, useState,
} from "react";
import PropTypes from "prop-types";
import useTranslation from "../../../../../hooks/useTranslation";
import AppContext from "../../../../../contexts/AppContext";
import useField from "../../../../Form/hooks/useField";
import CategoryTiles from "./CategoryTiles";
import SelectType from "./SelectType";
import useErrors from "../../../../Form/hooks/useErrors";

const getNavigationChain = (items, id, parent = [], callback) => {
	// eslint-disable-next-line guard-for-in,no-restricted-syntax
	for (const index in items) {
		const item = items[index];
		item.options = items;
		item.value = item.id;
		const chain = [...parent, item];
		if (item.id === parseInt(id, 10)) {
			callback(chain);
			return true;
		}
		getNavigationChain(item.children, id, chain, callback);
	}
	return false;
};

export default function CategoryChooser({ name, value, onChange }) {
	const { t } = useTranslation();
	const { store: { navigation } } = useContext(AppContext);
	const { errors } = useErrors(name);
	const { fieldValue, setFieldValue } = useField(name, value);
	const [categories, setCategories] = useState([
		{ value: "", options: navigation },
	]);
	const onChangeHandler = (idx, val) => {
		setFieldValue(false);
		const cat = categories[idx].options.filter(
			(obj) => obj.id === parseInt(val, 10),
		).pop();
		const state = [...categories];
		state[idx] = {
			...state[idx],
			value: val,
		};
		if (cat) {
			if (cat.children.length > 0) {
				state.splice(idx + 1, state.length, { value: "", options: cat.children });
			} else {
				state.splice(idx + 1, state.length);
				setFieldValue(cat);
			}
		} else {
			state.splice(idx + 1, state.length);
		}
		setCategories(state);
		onChange();
	};
	useEffect(() => {
		if (fieldValue) {
			getNavigationChain(navigation, fieldValue.id, [], (c) => {
				setCategories(c);
			});
		}
	}, []);
	return <div className={`category-chooser ${errors && "error"}`}>
		{categories.map((category, key) => (
			key === 0
				? <CategoryTiles
					name={`cat${key}`}
					options={category.options}
					value={category.value}
					onChange={(e) => onChangeHandler(key, e)}
				/>
				: <>
					{key === 1 && <div className="header-small">{t("add_goods_cat_window_item_type")}</div>}
					<div className="select-2">
						<SelectType
							name={`cat${key}`}
							value={category.value}
							category={category}
							id={key}
							key={key}
							onChange={(e) => onChangeHandler(key, e.target.value)}/>
					</div>
				</>
		))}
		{ errors
			&& <p className="message">{errors}</p>
		}
	</div>;
}

CategoryChooser.onChange = {
	onChange: PropTypes.func,
};

CategoryChooser.defaultProps = {
	onChange: () => {},
};
