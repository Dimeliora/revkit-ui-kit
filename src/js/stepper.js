export class Stepper {
	static createHTMLTemplate(step) {
		return `
            <button
                class="stepper__button"
                aria-label="Decrease value by ${step}"
                title="Decrease value by ${step}"
                data-stepper-button="dec"
            >
                <svg class="stepper__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <line x1="5" y1="12" x2="19" y2="12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <span
                class="stepper__value"
                data-stepper-text
            ></span>
            <button
                class="stepper__button"
                aria-label="Increase value by ${step}"
                title="Increase value by ${step}"
                data-stepper-button="inc"
            >
                <svg class="stepper__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M4 12H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;
	}

	/**
	 * @param {Object} options - Options object for stepper element creation
	 * @param {string} options.selector - CSS selector for stepper element injection
	 * @param {number=} options.value - Initial stepper value
	 * @param {number=} options.min - Minimum stepper value
	 * @param {number=} options.max - Maximum stepper value
	 * @param {number=} options.step - Step value
	 * @param {boolean=} options.disabled - Disabled attribute, makes the stepper element not focusable
	 */

	#value;
	#min;
	#max;
	#step;
	#disabled;
	#root;
	#incButton;
	#decButton;
	#valueText;

	constructor({
		selector,
		value = 0,
		min = 0,
		max = Infinity,
		step = 1,
		disabled = false,
	}) {
		this.#root = document.querySelector(selector);
		if (this.#root === null) {
			console.error(
				`Container element "${selector}" for stepper is not available`
			);
			return;
		}

		if (this.#min >= this.#max) {
			console.error('Inappropriate "min" and "max" values');
			return;
		}

		this.#value = value;
		this.#min = min;
		this.#max = max;
		this.#step = step;
		this.#disabled = disabled;

		this.#render();
		this.#setup();
	}

	get value() {
		return this.#value;
	}

	#render() {
		this.#root.classList.add("stepper");
		if (this.#disabled) {
			this.#root.classList.add("stepper--disabled");
		}

		this.#root.innerHTML = Stepper.createHTMLTemplate(this.#step);
	}

	#setup() {
		this.#value = Math.max(this.#min, this.#value);
		this.#value = Math.min(this.#value, this.#max);

		this.#incButton = this.#root.querySelector(
			'[data-stepper-button="inc"]'
		);
		this.#decButton = this.#root.querySelector(
			'[data-stepper-button="dec"]'
		);
		this.#valueText = this.#root.querySelector("[data-stepper-text]");

		this.#checkBorderValues();
		this.#updateValueText(this.#value);

		if (!this.#disabled) {
			this.#incButton.addEventListener("click", this.#buttonClickHandler);
			this.#decButton.addEventListener("click", this.#buttonClickHandler);
		}
	}

	#buttonClickHandler = (e) => {
		const { stepperButton } = e.currentTarget.dataset;

		const sign = stepperButton === "inc" ? 1 : -1;

		const nextValue = this.#value + this.#step * sign;
		if (nextValue < this.#min || nextValue > this.#max) {
			return;
		}

		this.#value = nextValue;
		this.#updateValueText(this.#value);
		this.#checkBorderValues();
	};

	#updateValueText = (value) => {
		this.#valueText.textContent = String(value).padStart(2, "0");
	};

	#checkBorderValues() {
		if (this.#value - this.#step < this.#min || this.#disabled) {
			this.#decButton.setAttribute("disabled", "true");
			this.#decButton.setAttribute("tabindex", "-1");
		} else {
			this.#decButton.removeAttribute("disabled");
			this.#decButton.removeAttribute("tabindex");
		}

		if (this.#value + this.#step > this.#max || this.#disabled) {
			this.#incButton.setAttribute("disabled", "true");
			this.#incButton.setAttribute("tabindex", "-1");
		} else {
			this.#incButton.removeAttribute("disabled");
			this.#incButton.removeAttribute("tabindex");
		}
	}

	destroy() {
		this.#incButton.removeEventListener("click", this.#buttonClickHandler);
		this.#decButton.removeEventListener("click", this.#buttonClickHandler);

		this.#root.classList.remove("stepper", "stepper--disabled");
		this.#root.innerHTML = "";
	}
}
