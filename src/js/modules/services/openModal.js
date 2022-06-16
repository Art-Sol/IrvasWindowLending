function openModal(modal) {
	let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
	modal.style.display = "block";
	document.body.style.overflow = "hidden";
	document.body.style.paddingRight = `${scrollWidth}px`;
}

export default openModal;