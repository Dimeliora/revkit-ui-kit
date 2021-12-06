const dictionary = {
	email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
	minLength: /^.{6,}$/,
	notEmpty: /.{1,}/,
};

const isCheckboxOrRadio = (input) =>
	input.type === "checkbox" || input.type === "radio";

/**
 * Validation function. Checks input value by RegExp provided in dictionary by input data-required attribute value
 * @param {HTMLInputElement} element
 * @returns {Boolean} - Return true if input valid or doesn't has data-required attr
 */
function validate(element) {
	const validationCriteria = element.dataset.required;
	if (isCheckboxOrRadio(element) && Boolean(validationCriteria)) {
		return element.checked;
	}

	if (!dictionary[validationCriteria]) {
		return true;
	}

	return dictionary[validationCriteria].test(element.value);
}

const formValidationHandler = (inputElements, onSubmit, e) => {
	e.preventDefault();

	const form = e.target;
	let isFormValid = true;
	for (const input of inputElements) {
		let inputWrapper;
		let invalidClassName;
		if (isCheckboxOrRadio(input)) {
			inputWrapper = input.closest(`.${input.type}`);
			invalidClassName = `${input.type}--invalid`;
		} else {
			inputWrapper = input.closest(".text-field");
			invalidClassName = "text-field--invalid";
		}

		if (validate(input)) {
			inputWrapper.classList.remove(invalidClassName);
		} else {
			inputWrapper.classList.add(invalidClassName);
			isFormValid = false;
		}
	}

	if (isFormValid) {
		const result = [...inputElements].map((input) => {
			if (input.type === "checkbox") {
				return { [input.name]: input.checked };
			}

			return { [input.name]: input.value };
		});

		form.reset();

		onSubmit(result);
	}
};

const clearErrorOnInputHandler = (input) => {
	if (isCheckboxOrRadio(input)) {
		const inputWrapper = input.closest(`.${input.type}`);
		inputWrapper.classList.remove(`${input.type}--invalid`);
	} else {
		const textField = input.closest(".text-field");
		textField.classList.remove("text-field--invalid");
	}
};

export const formValidationOnSubmit = ({ selector, onSubmit = () => {} }) => {
	const form = document.querySelector(selector);

	if (form === null) {
		console.error(`Form ${selector} is not available`);
		return;
	}

	const inputElements = form.querySelectorAll("[name]");
	form.addEventListener(
		"submit",
		formValidationHandler.bind(this, inputElements, onSubmit)
	);
	inputElements.forEach((input) => {
		input.addEventListener(
			"input",
			clearErrorOnInputHandler.bind(this, input)
		);
	});
};
