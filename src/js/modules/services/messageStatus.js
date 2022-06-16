function messageStatus(messageText, blockForInsert, messageClass, insertType) {
	const messageStatus = document.createElement('div');
	messageStatus.innerText = messageText;
	messageStatus.classList.add(messageClass);
	blockForInsert.insertAdjacentElement(insertType, messageStatus);
}

export default messageStatus;


