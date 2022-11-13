export function validateField(jsonField) {
	const value = jsonField.value;

	const valid = validateType(value, jsonField.type, jsonField.required);
	if (jsonField['setError']) {
		jsonField['setError'](!valid)
	}
	return !valid;
}

export function validateFields(jsonFields) {
	const resultJsonArray = {};
	for (let key in jsonFields) {
		if (jsonFields.hasOwnProperty(key)) {
			resultJsonArray[key] = validateField(jsonFields[key])
		}
	}
	return resultJsonArray;
}

function isValidEmail(email, required) {
	if (!email?.length && required) {
		// It's empty
		return false;
	} else if (required && !/^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/.test(email)) {
		// It's invalid
		return false;
	} else {
		// It's valid
		return true;
	}
}

function isValidPhone(phone, required) {
	if (!phone?.length && required) {
		// It's empty
		return false;
	} else if (required && !/\+(\d-\d{1,3}|\d{1,3})_\d{6,10}$/.test(phone)) {
		// It's invalid
		return false;
	} else {
		// It's valid
		return true;
	}
}

function validateType(value, type, required) {
	if (type == 'email') {
		return isValidEmail(value, required)
	} else if (type == 'phone') {
		let valid = true;
		if (Array.isArray(value)) {
			for (let phone of value) {
				valid = valid && isValidPhone(phone, required);
			}
		} else {
			valid = isValidPhone(value, required);
		}
		return valid;
	} else {
		return !required || value?.length;
	}
}