const validator = (object) => {
	const errors = {};
	Object.keys(object).map((key) => {
		if (object[key].validation) {
			object[key].validation.map((rule) => {
				if (rule === "notEmpty") {
					if (object[key].value.length === 0) {
						errors[key] = "Поле не должно быть пустым";
					}
				}
				if (rule === "minLength") {
					if (object[key].value === undefined || object[key].value.length < 5) {
						errors[key] = "Нужно больше букв";
					}
				}
				if (rule === "isNumber") {
					if (!(/[1-9]/i.test(object[key].value))) {
						errors[key] = "Введите число";
					}
				}
				if (rule === "minWords") {
					if (object[key].value === undefined || object[key].value.split(" ").length < 5) {
						errors[key] = "Нужно ввести минимум 5 слов";
					}
				}
				return true;
			});
		}
		return true;
	});

	return errors;
};

export default validator;
