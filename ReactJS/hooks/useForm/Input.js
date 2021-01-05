import React from "react";
import { findErrors } from "./useForm";

export default function Input({
	name, error, placeholder, type, className, labelName, ...props
}) {
	const err = findErrors(error, name);
	return <div className={`form-input ${err ? "error" : ""} ${className || ""}`}>
		<label className="formLabel" htmlFor={name}>{labelName}</label>
		<input
			{...props}
			type={!type ? "text" : type}
			name={name}
			placeholder={placeholder}
		/>
		{ err
			&& <p className="message">{err}</p>
		}
	</div>;
}
