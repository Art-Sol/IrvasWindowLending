function timer(deadline, selectorTimer) {
	
	function getTimeRemaining(endTime) {
		const remainingTime = Date.parse(endTime) - Date.parse(new Date()),
				days = Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
				hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24),
				minutes = Math.floor((remainingTime / (1000 * 60)) % 60),
				seconds = Math.floor((remainingTime / 1000) % 60);

		return {
			'total': remainingTime,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function addZero(num) {
		if (num.toString().length > 1) {
			return num;
		} else {
			return `0${num}`;
		}
	}

	function setTimer(endTime, selector) {
		const timer = document.querySelector(selector),
				daysElem = timer.querySelector('#days'),
				hoursElem = timer.querySelector('#hours'),
				minutesElem = timer.querySelector('#minutes'),
				secondsElem = timer.querySelector('#seconds'),
				timerInterval = setInterval(updateTimer, 1000);
		
		function updateTimer() {
			const timeRemaining = getTimeRemaining(endTime);
			
			daysElem.textContent = addZero(timeRemaining.days);
			hoursElem.textContent = addZero(timeRemaining.hours);
			minutesElem.textContent = addZero(timeRemaining.minutes);
			secondsElem.textContent = addZero(timeRemaining.seconds);
			if(timeRemaining.total <= 0) {
				clearInterval(timerInterval);
			}
		}

		updateTimer();
	}

	setTimer(deadline, selectorTimer);

}

export default timer;