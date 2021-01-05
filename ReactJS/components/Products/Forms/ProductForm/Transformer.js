const getFormData = (data) => {
	const formData = new FormData();
	// eslint-disable-next-line no-restricted-syntax,guard-for-in
	for (const key in data) {
		const value = data[key];
		if (value && typeof value !== "object") {
			formData.append(key, value);
		} else if (value instanceof Array && key === "images") {
			value.forEach((el, index) => {
				if (el instanceof File) {
					formData.append(`${key}[${index}][file]`, el);
					formData.append(`${key}[${index}][position]`, index);
				}
			});
		}
	}
	return formData;
};

export function transform(product) {
	const result = {};
	// eslint-disable-next-line no-restricted-syntax,guard-for-in
	for (const key in product) {
		const value = product[key];
		// eslint-disable-next-line default-case
		switch (key) {
		case "brand":
		case "category":
		case "user":
		case "size":
		case "condition":
		case "color":
			result[key] = value instanceof Object ? value.id : value;
			break;
		case "price":
			result[key] = product.isFree ? 0 : value;
			break;
		default:
			result[key] = value;
			break;
		}
	}
	return getFormData(result);
}

export default {};
