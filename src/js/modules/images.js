import closeModal from './services/closeModal';

function images() {
		const imagesRow = document.querySelector('.works .row'),
				images = imagesRow.querySelectorAll('.preview');

		const imgPopup =  document.createElement('div'),
				imageBig = document.createElement('img');

		imgPopup.classList.add('popup');
		imgPopup.setAttribute('data-modal','');

		imgPopup.style.display = 'none';
		imgPopup.style.justifyContent = 'center';
		imgPopup.style.alignItems = 'center';

		imageBig.style.maxWidth = '70vw';
		imageBig.style.maxHeight = '70vh';
		imageBig.style.objectFit = 'contain';

		imgPopup.append(imageBig);
		imagesRow.append(imgPopup);

		function openWindowModal(imgElem) {
			const src = imgElem.parentElement.getAttribute('href');
			imageBig.setAttribute('src', src);
			imgPopup.style.display = 'flex';
			document.body.style.overflow = "hidden";
		}

		imagesRow.addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target && Array.from(images).includes(e.target)) {
				openWindowModal(e.target);
			}
			if (e.target && e.target === imgPopup) {
				closeModal(imgPopup);
			}
		});
}

export default images;