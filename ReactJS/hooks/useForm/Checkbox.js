import React from "react";
import { findErrors } from "./useForm";

export default function Checkbox({
	error, title, className, name, value, onChange, form, ...props
}) {
	const err = findErrors(error, name);
	return <span className={`form-input ${className || ""} ${err ? "error" : ""}`}>
		<input
			type="checkbox"
			name={name}
			value={!value}
			id={name}
			{...props}
			onChange={onChange}
		/>
		<label htmlFor={name}>{title}</label>
		{err
			&& <p className="message">{err}</p>
		}
	</span>;
}
