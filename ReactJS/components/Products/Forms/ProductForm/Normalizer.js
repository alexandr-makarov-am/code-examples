import getImageList from "../../../../utils/getImageList";

export function normalize(values) {
	let result = {
		...values,
		isFree: values && values.isFree ? !values.price : false,
		images: values instanceof Object && values.images ? getImageList(values.images) : values,
	};

	if (result.address && result.address) {
		result = {
			...result,
			city: result.address.cityId,
		};
	}

	if (values && values.filters) {
		const filters = values.filters.map(({ options, id, group = "options" }) => ({
			[`${group}[${id}]`]: options[0].id,
		}));
		// eslint-disable-next-line no-restricted-syntax
		for (const filter of filters) {
			result = {
				...result,
				...filter,
			};
		}
	}

	return result;
}

export default {};
