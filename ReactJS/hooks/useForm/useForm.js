import { useState, useEffect } from "react";
import validator from "./validator";

const form = {};
const useForm = (inputs) => {
	const [formValue, setFormValue] = useState(form);
	const [error, setError] = useState();
	const handleChange = (e) => {
		setFormValue(({
			...formValue,
			[e.target.name]: {
				value: e.target.value,
				validation: formValue[e.target.name] && formValue[e.target.name].validation,
			},
		}
		));
	};

	useEffect(() => {
		// eslint-disable-next-line no-return-assign
		inputs.map((item) => form[item[0]] = { value: item[2], validation: item[1] });
	}, [inputs]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(() => validator(formValue));
		return validator(formValue);
	};
	return {
		handleChange,
		handleSubmit,
		setFormValue,
		setError,
		formValue,
		form: (() => {
			const result = {};
			Object.keys(formValue).forEach((name) => {
				result[name] = formValue[name].value;
			});
			return result;
		})(),
		error,
	};
};
export const findErrors = (err, name) => {
	let result;
	if (err) {
		// eslint-disable-next-line no-return-assign
		Object.keys(err).map((item) => (item === name ? result = err[name] : null));
	}
	return result;
};
export default useForm;
