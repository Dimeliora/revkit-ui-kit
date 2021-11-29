export class Rating {
	static starItemTemplate(value) {
		return `
            <button
                class="rating__star-item"
                data-rating-value="${value}"
                data-rating-element="button-item"
                aria-label="Rating star button ${value}"
				tabindex="${value}"
            >
                <svg
                    class="rating__star-icon"
                    viewBox="0 0 20 19"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15Z"
                    />
                </svg>
            </button>
        `;
	}

	static createHTMLTemplate() {
		const starButtons = [...Array(5).keys()]
			.map((item) => Rating.starItemTemplate(item + 1))
			.reverse();

		return `
            <div class="rating__top">
                <div class="rating__stars" data-rating-element="buttons">
                    ${starButtons.join(" ")}
                </div>
                <div class="rating__value" data-rating-element="value">0.0</div>
            </div>
            <div class="rating__bottom" data-rating-element="votes"></div>
        `;
	}

	#ratings = 0;
	#votes = 0;
	#value = 0;
	#root;
	#ratingButtons;
	#ratingValue;
	#ratingVotes;

	/**
	 * @param {Object} options - Options object for rating creation
	 * @param {string} options.selector - CSS selector for rating element injection
	 */
	constructor({ selector }) {
		this.#root = document.querySelector(selector);
		if (this.#root === null) {
			console.error(
				`Container element "${selector}" for rating is not available`
			);
			return;
		}

		this.#render();
		this.#setup();
	}

	get value() {
		return Number(this.#value.toFixed(1));
	}

	get count() {
		return this.#votes;
	}

	#render() {
		this.#root.classList.add("select");
		this.#root.innerHTML = Rating.createHTMLTemplate();
	}

	#setup() {
		this.#ratingButtons = this.#root.querySelector(
			'[data-rating-element="buttons"]'
		);
		this.#ratingValue = this.#root.querySelector(
			'[data-rating-element="value"]'
		);
		this.#ratingVotes = this.#root.querySelector(
			'[data-rating-element="votes"]'
		);

		this.#ratingButtons.addEventListener(
			"click",
			this.#ratingButtonsClickHandler
		);
	}

	#ratingButtonsClickHandler = ({ target }) => {
		const buttonElm = target.closest('[data-rating-element="button-item"]');
		if (buttonElm) {
			const ratingValue = Number(buttonElm.dataset.ratingValue);
			this.#ratings += ratingValue;

			this.#votes += 1;

			this.#value = this.#ratings / this.#votes;

			this.#updateRatingView();
		}
	};

	#updateRatingView() {
		this.#ratingValue.textContent = this.#value.toFixed(1);

		const ratingFloor = Math.floor(this.#value);

		[...this.#ratingButtons.children].forEach((button) => {
			const ratingValue = Number(button.dataset.ratingValue);
			if (ratingValue <= ratingFloor) {
				button.classList.add("rating__star-item--active");
			} else {
				button.classList.remove("rating__star-item--active");
			}
		});

		this.#ratingVotes.textContent = `based on ${this.#votes} ratings`;
	}

	destroy() {
		this.#ratingButtons.removeEventListener(
			"click",
			this.#ratingButtonsClickHandler
		);

		this.#root.classList.remove("select");
		this.#root.innerHTML = "";
	}
}
