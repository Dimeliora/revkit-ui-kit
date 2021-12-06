export const calloutActionsMenuHandler = (selector) => {
	const calloutElements = document.querySelectorAll(selector);

	if (calloutElements.length === 0) {
		return;
	}

	const calloutMoreBtnHandler = (currentCalloutMenu = null) => {
		calloutElements.forEach((callout) => {
			const calloutActionsMenu =
				callout.querySelector(".callout__actions");

			if (calloutActionsMenu === currentCalloutMenu) {
				currentCalloutMenu.classList.toggle("callout__actions--active");
			} else {
				calloutActionsMenu.classList.remove("callout__actions--active");
			}
		});
	};

	calloutElements.forEach((callout) => {
		const calloutMoreBtn = callout.querySelector(".callout__more");
		const calloutActionsMenu = callout.querySelector(".callout__actions");

		calloutMoreBtn.addEventListener(
			"click",
			calloutMoreBtnHandler.bind(this, calloutActionsMenu)
		);
	});

	document.addEventListener("click", (e) => {
		if (!e.target.closest(selector)) {
			calloutMoreBtnHandler();
		}
	});
};
