import closeModal from "./services/closeModal";
import openModal from "./services/openModal";

function modals(state) {
	function bindModal(triggerSelector, windowSelector, closeSelector, closeByOverlay = true, propsValidation = []) {
		const triggers = document.querySelectorAll(triggerSelector),
				window = document.querySelector(windowSelector),
				closeBtn = document.querySelector(closeSelector),
				allModals = document.querySelectorAll('[data-modal]');

		triggers.forEach(trigger => {
			trigger.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				if (propsValidation.length > 0) {
					let checkValidation = propsValidation.every(item => state[item]);
					if (checkValidation) {
						allModals.forEach(modal => closeModal(modal));
						openModal(window);
					} else {
						const existentMessageValid = document.querySelector('.messageValid');
						if (existentMessageValid) {
							existentMessageValid.remove();
						}
						const messageValid = document.createElement('div');
						messageValid.innerText = 'Пожалуйста заполните все поля';
						messageValid.classList.add('messageValid', 'status');
						trigger.insertAdjacentElement('beforeBegin', messageValid);
					}
				} else {
					allModals.forEach(modal => closeModal(modal));
					openModal(window);
				}
			});
		});

		closeBtn.addEventListener('click', () => {
				allModals.forEach(modal => closeModal(modal));
				closeModal(window);
		});

		window.addEventListener('click', (e) => {
			if (e.target == window && closeByOverlay == true) {
				allModals.forEach(modal => closeModal(modal));
				closeModal(window);
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.code === 'Escape') {
				allModals.forEach(modal => closeModal(modal));
				closeModal(window);
			}
		});
	}

	function showModalByTime(windowSelector, time) {
		const window = document.querySelector(windowSelector), 
				allModals = document.querySelectorAll('[data-modal]');
				
		setTimeout(() => {
			let openMode = true;
			
			allModals.forEach(modal => {
				if (getComputedStyle(modal).display !== 'none') {
					openMode = false;
				}
			});

			if (openMode) {
				openModal(window);
			}
		}, time);
	}


	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false);
	bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false, 
	['form', 'width', 'height']);
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false,
	['type', 'profile']);
	showModalByTime('.popup', 60000);
}

export default modals;
