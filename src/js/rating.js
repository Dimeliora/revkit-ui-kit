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
                    viewBox="0 0 10 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
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

    static calculateOverallRating(ratings) {
        const votesCount = Object.values(ratings).reduce(
            (sum, value) => sum + value,
            0
        );
        const allRatingsSum = Object.entries(ratings).reduce(
            (sum, [rate, count]) => sum + rate * count,
            0
        );
        const overallRating =
            Number((allRatingsSum / votesCount).toFixed(1)) || 0;

        return { votesCount, overallRating };
    }

    get ratings() {
        return this.#ratings;
    }

    get overallRating() {
        return this.#overallRating;
    }

    get totalVotes() {
        return this.#totalVotes;
    }

    #ratings = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };
    #totalVotes = 0;
    #overallRating = 0;
    #root;
    #ratingButtons;
    #ratingValue;
    #ratingVotes;

    /**
     * @param {Object} options - Options object for rating creation
     * @param {string} options.selector - CSS selector for rating element injection
     * @param {Object} options.initialRatings - Object with initial vote counts for every rating value
     */
    constructor({ selector, initialRatings }) {
        this.#root = document.querySelector(selector);
        if (this.#root === null) {
            console.error(
                `Container element "${selector}" for rating is not available`
            );
            return;
        }

        this.#render();
        this.#setup();

        if (initialRatings) {
            this.#ratings = initialRatings;
            this.#calculateRating();
            this.#updateRatingView();
        }
    }

    #render() {
        this.#root.classList.add("rating");
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

        this.#ratings[ratingButtonValue] += 1;

        this.#calculateRating();
        this.#updateRatingView();

        currentTarget.blur();
    };

    #calculateRating() {
        const overall = Rating.calculateOverallRating(this.#ratings);
        this.#totalVotes = overall.votesCount;
        this.#overallRating = overall.overallRating;
    }

    #updateRatingView() {
        if (this.#overallRating > 0) {
            this.#ratingValue.textContent = this.#overallRating.toFixed(1);
        }

        if (this.#totalVotes > 0) {
            this.#ratingVotes.textContent = `based on ${
                this.#totalVotes
            } ratings`;
        }

        const intRating = Math.floor(this.#overallRating);
        const fracRating = this.#overallRating - intRating;

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

            if (fracRating >= 0.5 && ratingButtonValue === intRating + 1) {
                button.classList.add("rating__star-item--half");
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

        this.#root.classList.remove("rating");
        this.#root.innerHTML = "";
    }
}
