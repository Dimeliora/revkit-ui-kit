export class Rating {
    static getStarItemTemplate(value) {
        return `
            <button
                class="rating__star-item"
                data-rating-value="${value}"
                data-rating-element="button-item"
                aria-label="Rating star button ${value}"
            >
				<svg
					class="rating__star-icon rating__star-icon--left"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						viewBox="0 0 10 20"
						d="M 10 15 L 4.1222 18.0902 L 5.2447 11.5451 L 0.4894 6.9098 L 7.0611 5.9549 L 10 0 L 10 15 Z"
					/>
				</svg>
				<svg
					class="rating__star-icon rating__star-icon--right"
					viewBox="10 0 10 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M 10 15 L 10 0 L 12.9389 5.9549 L 19.5106 6.9098 L 14.7553 11.5451 L 15.8779 18.0902 L 10 15 Z"
					/>
				</svg>
            </button>
        `;
    }

    static createHTMLTemplate() {
        const starButtons = [...Array(5).keys()]
            .map((item) => Rating.getStarItemTemplate(item + 1))
            .reverse();

        return `
            <div class="rating__top">
                <div class="rating__stars">
                    ${starButtons.join(" ")}
                </div>
                <div class="rating__value" data-rating-element="value">Nobody rate yet</div>
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
        this.#ratingButtons = this.#root.querySelectorAll(
            '[data-rating-element="button-item"]'
        );
        this.#ratingValue = this.#root.querySelector(
            '[data-rating-element="value"]'
        );
        this.#ratingVotes = this.#root.querySelector(
            '[data-rating-element="votes"]'
        );

        this.#ratingButtons.forEach((button) => {
            button.addEventListener("click", this.#ratingButtonsClickHandler);
        });
    }

    #ratingButtonsClickHandler = ({ currentTarget }) => {
        const ratingButtonValue = Number(currentTarget.dataset.ratingValue);
        this.#ratings += ratingButtonValue;

        this.#votes += 1;

        this.#value = this.#ratings / this.#votes;

        this.#updateRatingView();

        currentTarget.blur();
    };

    #updateRatingView() {
        this.#ratingValue.textContent = this.#value.toFixed(1);

        this.#ratingVotes.textContent = `based on ${this.#votes} ratings`;

        const intRating = Math.floor(this.value);
        const fracRating = this.value - intRating;

        this.#ratingButtons.forEach((button) => {
            const ratingButtonValue = Number(button.dataset.ratingValue);

            if (ratingButtonValue <= intRating) {
                button.classList.add("rating__star-item--full");
            } else {
                button.classList.remove(
                    "rating__star-item--full",
                    "rating__star-item--half"
                );
            }

            if (fracRating && ratingButtonValue === intRating + 1) {
                if (fracRating < 0.5) {
                    button.classList.add("rating__star-item--half");
                } else {
                    button.classList.add("rating__star-item--full");
                }
            }
        });
    }

    destroy() {
        this.#ratingButtons.forEach((button) => {
            button.removeEventListener(
                "click",
                this.#ratingButtonsClickHandler
            );
        });

        this.#root.classList.remove("select");
        this.#root.innerHTML = "";
    }
}
