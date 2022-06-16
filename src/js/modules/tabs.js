function tabs(tabsBlockSelector, tabSelector, contentSelector, activeClass, displayStyleContent = 'block') {
	const tabsBlock = document.querySelector(tabsBlockSelector),
			tabs = document.querySelectorAll(tabSelector),
			content = document.querySelectorAll(contentSelector);


	function hideTabs() {
		tabs.forEach(item => {
			item.classList.remove(activeClass);
			item.children.forEach(child => child.classList.remove(activeClass));
		});
		
		content.forEach(item => {
			item.style.display = 'none';
		});
	}

	function showCurrentTab(currentTabIndex = 0) {
		tabs[currentTabIndex].classList.add(activeClass);
		tabs[currentTabIndex].children.forEach(child => child.focus());
		tabs[currentTabIndex].children.forEach(child => child.classList.add(activeClass));
		content[currentTabIndex].style.display = displayStyleContent;
	}

	tabsBlock.addEventListener('click', (e) => {
		if (e.target || e.target.closest(tabSelector)) {
			e.preventDefault();
			tabs.forEach((item, i) => {
				if (item === e.target.closest(tabSelector)) {
					hideTabs();
					showCurrentTab(i);
				}
			});
		} 
	});
	

	hideTabs();
	showCurrentTab();
}

export default tabs;