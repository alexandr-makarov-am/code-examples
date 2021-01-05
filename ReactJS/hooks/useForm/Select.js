import React from "react";
import { findErrors } from "./useForm";

export default function Select({
	options, className, name, title, error, ...props
}) {
	const err = findErrors(error, name);
	return 	<span className={`form-input ${className} ${err ? "error" : ""}`}>
		<select
			{...props}
			name={name}
			defaultValue={""}
			className="select clothes-type">
			<option disabled value={""}>{title}</option>
			{options.map((item) => <option value={item.id} key={item.id}>
				{item.value}</option>)}
		</select>
	</span>;
}
