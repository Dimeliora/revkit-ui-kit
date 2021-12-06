export const moreMenuHandler = ({ selector, activeClass }) => {
	const elements = document.querySelectorAll(selector);

	if (elements.length === 0) {
		return;
	}

	const moreButtonHandler = (currentElementMenu = null) => {
		elements.forEach((elm) => {
			const moreMenu = elm.querySelector("[data-menu-more]");

			if (moreMenu === currentElementMenu) {
				currentElementMenu.classList.toggle(activeClass);
			} else {
				moreMenu.classList.remove(activeClass);
			}
		});
	};

	elements.forEach((elm) => {
		const moreButton = elm.querySelector("[data-button-more]");
		const moreMenu = elm.querySelector("[data-menu-more]");

		moreButton.addEventListener(
			"click",
			moreButtonHandler.bind(this, moreMenu)
		);
	});

	document.addEventListener("click", (e) => {
		if (!e.target.closest(selector)) {
			moreButtonHandler();
		}
	});
};
