import inputValidationNumber from "./services/inputValidationNumber";
import postData from "./services/postData";
import closeModal from "./services/closeModal";
// import messageStatus from "./services/messageStatus";

function forms(state) {
	const forms = document.querySelectorAll('form'),
			inputs = document.querySelectorAll('input'),
			phoneInputs = document.querySelectorAll('input[name="user_phone"]'),
			specialCalcForm = document.querySelector('.popup_calc_end form');

	const messages = {
		loading: 'Отправляем данные. Подождите некоторое время...',
		success: 'Спасибо! Мы скоро свяжемся с вами',
		error: 'Что-то пошло не так. Попробуйте еще раз'
	};

	forms.forEach(form => {
		initFormSubmit(form);
	});

	phoneInputs.forEach(input => {
		input.addEventListener('input', () => {
			inputValidationNumber(input);
		});
	});

	function initFormSubmit(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			
			// messageStatus(messages.loading, form, 'status', 'beforeend');


			const messageStatus = document.createElement('div');
			messageStatus.innerText = messages.loading;
			messageStatus.classList.add('status');

			form.insertAdjacentElement('beforeend', messageStatus);

			const formData = new FormData(form);

			if (form === specialCalcForm) {
				for(let key in state) {
					formData.append(key, state[key]);
				}
			}
		
			postData('assets/server.php', formData)
				.then(data => {
					console.log(data);
					// messageStatus(messages.success, form, 'status', 'beforeend');
					messageStatus.innerText = messages.success;
				})
				.catch(() => {
					messageStatus.innerText = messages.error;
					// messageStatus(messages.error, form, 'status', 'beforeend');
				})
				.finally(() => {
					const messageStatus = document.querySelector('.status'),
							allModals = document.querySelectorAll('[data-modal]');

					setTimeout(() => messageStatus.remove(), 4000);
					setTimeout(() => allModals.forEach(modal => closeModal(modal)), 6000);

					for (let key in state) {
						delete state[key];
					}
					
					inputs.forEach(input => input.value = "");


				});
		});
	}
}

export default forms;