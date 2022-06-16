import inputValidationNumber from "./services/inputValidationNumber";

function changeModalState(state) {
	const windowForm = document.querySelectorAll('.balcon_icons_img'),
			windowWidth = document.querySelectorAll('#width'),
			windowHeight = document.querySelectorAll('#height'),
			windowType = document.querySelectorAll('#view_type'),
			windowProfile = document.querySelectorAll('.checkbox');

	function onlyOneCheckboxTarget(allCheckboxes, currentCheckbox) {
		allCheckboxes.forEach(item => {
			item.checked = false;
		});
		currentCheckbox.checked = true;
	}

	function initModalState(elem, eventType, prop) {
		elem.forEach((item, i) => {
			item.addEventListener(eventType, () => {
				switch (item.tagName) {
					case 'SPAN':
							state[prop] = i+1;
							console.log(state);
						break;
					case 'INPUT':
							if (item.type === 'checkbox') {
								onlyOneCheckboxTarget(windowProfile, item);
								i === 0 ? state[prop] = 'Cold' : state[prop] = 'Warm';
								console.log(state);
							} else {
								inputValidationNumber(item);
								state[prop] = item.value;
								console.log(state);
							}
						break;
					case 'SELECT':
							state[prop] = item.value;
							console.log(state);
						break;
				}
			});
		});
	}

	initModalState(windowForm, 'click', 'form');
	initModalState(windowWidth, 'input', 'width');
	initModalState(windowHeight, 'input', 'height');
	initModalState(windowType, 'change', 'type');
	initModalState(windowProfile, 'change', 'profile');
} 

export default changeModalState;