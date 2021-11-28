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
	constructor({
		selector,
		value = 0,
		min = 0,
		max = Infinity,
		step = 1,
		disabled = false,
	}) {
		this._root = document.querySelector(selector);
		this._value = value;
		this._min = min;
		this._max = max;
		this._step = step;
		this._disabled = disabled;

		this.#render();
		this.#setup();
	}

	get value() {
		return this._value;
	}

	#render() {
		if (this._root === null) {
			throw new Error("Container element for stepper is not available");
		}

		if (this._min >= this._max) {
			throw new Error('Inappropriate "min" and "max" values');
		}

		this._root.classList.add("stepper");
		if (this._disabled) {
			this._root.classList.add("stepper--disabled");
		}

		this._root.innerHTML = Stepper.createHTMLTemplate(this._step);
	}

	#setup() {
		this._value = Math.max(this._min, this._value);
		this._value = Math.min(this._value, this._max);

		this._incButton = this._root.querySelector(
			'[data-stepper-button="inc"]'
		);
		this._decButton = this._root.querySelector(
			'[data-stepper-button="dec"]'
		);
		this._valueText = this._root.querySelector("[data-stepper-text]");

		this.#checkBorderValues();
		this.#updateValueText(this._value);

		if (!this._disabled) {
			this._incButton.addEventListener("click", this.#buttonClickHandler);
			this._decButton.addEventListener("click", this.#buttonClickHandler);
		}
	}

	#buttonClickHandler = (e) => {
		const { stepperButton } = e.currentTarget.dataset;

		const sign = stepperButton === "inc" ? 1 : -1;

		const nextValue = this._value + this._step * sign;
		if (nextValue < this._min || nextValue > this._max) {
			return;
		}

		this._value = nextValue;
		this.#updateValueText(this._value);
		this.#checkBorderValues();
	};

	#updateValueText = (value) => {
		this._valueText.textContent = String(value).padStart(2, "0");
	};

	#checkBorderValues() {
		if (this._value - this._step < this._min || this._disabled) {
			this._decButton.setAttribute("disabled", "true");
			this._decButton.setAttribute("tabindex", "-1");
		} else {
			this._decButton.removeAttribute("disabled");
			this._decButton.removeAttribute("tabindex");
		}

		if (this._value + this._step > this._max || this._disabled) {
			this._incButton.setAttribute("disabled", "true");
			this._incButton.setAttribute("tabindex", "-1");
		} else {
			this._incButton.removeAttribute("disabled");
			this._incButton.removeAttribute("tabindex");
		}
	}

	destroy() {
		this._incButton.removeEventListener("click", this.#buttonClickHandler);
		this._decButton.removeEventListener("click", this.#buttonClickHandler);

		this._root.classList.remove("stepper", "stepper--disabled");
		this._root.innerHTML = "";
	}
}
