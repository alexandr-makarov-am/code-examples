import React, { useContext, useState } from "react";
import Link from "next/link";
import Form from "../../../Form";
import Input from "../../../Form/types/Input";
import Textarea from "../../../Form/types/Textarea";
import ValidationRule from "../../../Form/ValidationRule";
import RULES from "../../../Form/rules";
import useTranslation from "../../../../hooks/useTranslation";
import Checkbox from "../../../Form/types/Checkbox";
import CategoryChooser from "./types/CategoryChooser";
import { transform } from "./Transformer";
import { normalize } from "./Normalizer";
import ProductProperties from "./types/ProductProperties";
import ImageBlock from "./types/ImageBlock";
import api from "../../../../api";
import AppContext from "../../../../contexts/AppContext";

export default function ProductForm({
	data, onSubmit, errors = {}, disabled,
}) {
	const { t } = useTranslation();
	const { store: { user } } = useContext(AppContext);
	const [modal, setModal] = useState(false);
	const [priceHidden, setPriceHidden] = useState(data ? !data.price : false);
	const { token } = user;
	let defaultData = {
		images: [],
	};
	if (user.address && user.address.cityId) {
		defaultData = {
			city: user.address.cityId,
			...defaultData,
		};
	}
	const baseRules = [
		ValidationRule("title", RULES.IS_EMPTY, t("modal_reg_not_empty")),
		ValidationRule("description", RULES.MIN_WORDS, t("modal_five_words")),
		ValidationRule("category", RULES.IS_EMPTY, t("modal_reg_not_empty")),
		ValidationRule("images", RULES.IS_EMPTY, t("modal_reg_not_empty")),
		ValidationRule("price", RULES.IS_EMPTY, t("modal_reg_not_empty")),
	];
	const [rules, setRules] = useState(baseRules);
	const onChangeHandler = (values) => {
		setPriceHidden(values.isFree);
		if (values.isFree) {
			setRules(rules.filter((o) => o.name !== "price"));
		} else {
			const found = rules.find((o) => o.name === "price");
			if (!found) {
				setRules(
					rules.concat([
						ValidationRule("price", RULES.IS_EMPTY, t("modal_reg_not_empty")),
					]),
				);
			}
		}
	};
	const onUpdateValidationRules = (filters) => {
		const excluded = ["price", "gift", "barter", "isBarter", "isFree"];
		const nRules = filters
			.filter((filter) => {
				if (excluded.indexOf(filter.id) !== -1) {
					return false;
				}
				return true;
			})
			.map((filter) => ValidationRule(
				filter.group
					? `${filter.group}[${filter.id}]`
					: filter.id,
				RULES.IS_EMPTY,
				t("modal_reg_not_empty"),
			));
		setRules(baseRules.concat(nRules));
	};
	return <Form
		className="productForm addGoods"
		errors={errors}
		initialData={normalize({ ...defaultData, ...data })}
		rules={rules}
		onChange={onChangeHandler}
		handleSubmit={(v) => onSubmit(transform(v))}>
		<div className="main-header">{t(!data ? "add_goods_main" : "add_goods_edit")}</div>
		<div className="header-block">
			<div className="header">{t("add_goods_photo")}</div>
			<div className="help-block">
				<div className="help" onClick={() => setModal(!modal)}>{t("add_goods_imageorder")}</div>
			</div>
		</div>
		<div className="text">{t("add_goods_text")}</div>
		<ImageBlock
			name="images"
			modalIsOpen={modal}
			modalHandler={() => setModal(!modal)}
			removeImage={(id) => {
				if (data && data.slug) {
					return api.removePhotoById(data.slug, id, token);
				}
				return new Promise(((reject) => reject(data)));
			}}
			sortImage={(pos, id) => {
				if (data && data.slug) {
					return api.updatePhotoPositionById(data.slug, id, pos, token);
				}
				return new Promise(((reject) => reject(data)));
			}}
		/>
		<div className="header-block">
			<div className="header">{t("add_goods_description_window")}</div>
		</div>
		<div className="mainForm">
			<div className="form-group">
				<Input name="title" placeholder={t("add_goods_description_placeholder")} />
			</div>
			<div className="form-group">
				<Textarea name="description" rows="5" placeholder={t("add_goods_description_placeholder_text")} />
			</div>
		</div>
		<div className="header-block mt25">
			<div className="header">{t("add_goods_cat_window_category")}</div>
		</div>
		<div className="section mt45">
			<div className="headerCat">{t("add_goods_cat_window_category_text")}</div>
			<CategoryChooser name="category" onChange={() => setRules(baseRules)} />
		</div>
		<ProductProperties relationField="category" onChange={onUpdateValidationRules} />
		<div className="header-block price">
			<div className="header">{t("add_goods_price_window")}</div>
		</div>
		<div className="section mt30">
			<div className="form-group">
				<Checkbox name={"isBarter"} title={t("add_goods_exchange")} />
			</div>
		</div>
		<div className="section mt30">
			<div className="form-group">
				<Checkbox name={"isFree"} title={t("add_goods_price_free")} />
				{!priceHidden
					&& <Input
						type="number"
						name="price"
						inputMode="numeric"
						placeholder="цена"
					/>
				}
			</div>
		</div>
		<div className="form-group">
			<p className="rules">
				{t("add_goods_rules_text")}
				<Link href="/add-rules" as={"/add-rules"} >
					<a> {t("add_goods_rules")}</a>
				</Link>
			</p>
			<div className="discount-main-buttons">
				<button className={"btnFill"} disabled={disabled}>{t(!data ? "add_goods_add_item" : "save_sizes_btn")}</button>
			</div>
		</div>
	</Form>;
}
