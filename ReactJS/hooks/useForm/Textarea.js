import React from "react";
import { findErrors } from "./useForm";
import useTranslation from "../useTranslation";

export default function Textarea({
	error, name, placeholder, labelName, ...props
}) {
	const { t } = useTranslation();
	const err = findErrors(error, name);
	return <div className={`form-input ${err ? "error" : ""}`}>
		<label className="formLabel" htmlFor={name}>{labelName}</label>
		<textarea
			{...props}
			name={name}
			placeholder={placeholder}
		/>
		{err
      && <p className="message">{err}</p>
		}
		{!err && <label className="input-label">{t("add_goods_description_window_5letters")}</label>}
	</div>;
}
