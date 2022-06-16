function inputValidationNumber(input) {
	input.value = input.value.replace(/\D/, '');
}

export default inputValidationNumber;