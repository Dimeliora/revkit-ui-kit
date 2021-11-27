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
     * @param {number=} options.value - Initial value
     * @param {number=} options.min - Minimum stepper value
     * @param {number=} options.max - Maximum stepper value
     * @param {number=} options.step - Step value
     * @param {boolean=} options.disabled - Disabled attribute, makes the select element not focusable
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
        this.value = value;
        this.min = min;
        this.max = max;
        this.step = step;
        this.disabled = disabled;

        this.#render();
        this.#setup();
    }

    #render() {
        if (this._root === null) {
            throw new Error("DOM element not found");
        }

        if (this.min >= this.max) {
            throw new Error('Inappropriate "min" and "max" values');
        }

        this._root.classList.add("stepper");
        if (this.disabled) {
            this._root.classList.add("stepper--disabled");
        }

        this._root.innerHTML = Stepper.createHTMLTemplate(this.step);
    }

    #setup() {
        this.value = Math.max(this.min, this.value);
        this.value = Math.min(this.value, this.max);

        this._incButton = this._root.querySelector(
            '[data-stepper-button="inc"]'
        );
        this._decButton = this._root.querySelector(
            '[data-stepper-button="dec"]'
        );
        this._valueText = this._root.querySelector("[data-stepper-text]");

        this.#checkBorderValues();
        this.#updateValueText(this.value);

        if (!this.disabled) {
            this._incButton.addEventListener("click", this.#buttonClickHandler);
            this._decButton.addEventListener("click", this.#buttonClickHandler);
        }
    }

    #buttonClickHandler = (e) => {
        const { stepperButton } = e.currentTarget.dataset;

        const sign = stepperButton === "inc" ? 1 : -1;

        const nextValue = this.value + this.step * sign;
        if (nextValue < this.min || nextValue > this.max) {
            return;
        }

        this.value = nextValue;
        this.#updateValueText(this.value);
        this.#checkBorderValues();
    };

    #updateValueText = (value) => {
        this._valueText.textContent = String(value).padStart(2, "0");
    };

    #checkBorderValues() {
        if (this.value - this.step < this.min) {
            this._decButton.classList.add("stepper__button--inactive");
        } else {
            this._decButton.classList.remove("stepper__button--inactive");
        }

        if (this.value + this.step > this.max) {
            this._incButton.classList.add("stepper__button--inactive");
        } else {
            this._incButton.classList.remove("stepper__button--inactive");
        }
    }

    destroy() {
        this._incButton.removeEventListener("click", this.#buttonClickHandler);
        this._decButton.removeEventListener("click", this.#buttonClickHandler);

        this._root.classList.remove("stepper", "stepper--disabled");
        this._root.innerHTML = "";
    }
}
