export class Slider {
	static createHTMLTemplate(min, max, step, value, disabled) {
		const isDisabled = disabled ? "disabled" : "";

		return `
        <input
            type="range"
            class="slider__input"
            min="${min}"
            max="${max}"
            step="${step}"
            value="${value}"
            ${isDisabled}
        />
        <div class="slider__progress"></div>
        `;
	}

	/**
	 * @param {Object} options - Options object for slider element creation
	 * @param {string} options.selector - CSS selector for slider element injection
	 * @param {number=} options.value - Initial slider value
	 * @param {number=} options.min - Minimum slider value
	 * @param {number=} options.max - Maximum slider value
	 * @param {number=} options.step - Step slider value
	 * @param {boolean=} options.disabled - Disabled attribute, makes the slider element not focusable
	 */
	constructor({
		selector,
		value = 0,
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
	}) {
		this._root = document.querySelector(selector);
		this.min = min;
		this.max = max;
		this.step = step;
		this.value = value;
		this.disabled = disabled;

		this.#render();
		this.#setup();
	}

	#render() {
		if (this._root === null) {
			throw new Error("Container element for slider is not available");
		}

		this._root.classList.add("slider");

		this._root.innerHTML = Slider.createHTMLTemplate(
			this.min,
			this.max,
			this.step,
			this.value,
			this.disabled
		);
	}

	#setup() {
		this._input = this._root.querySelector(".slider__input");
		this._progress = this._root.querySelector(".slider__progress");

		this.#updateSliderProgress(this._input.value);

		this._input.addEventListener("input", this.#inputChangeHandler);
	}

	#inputChangeHandler = ({ target }) => {
		this.value = Number(target.value);
		this.#updateSliderProgress(target.value);
	};

	#updateSliderProgress(value) {
		this._progress.style.setProperty("width", `${value}%`);
	}

	destroy() {
		this._input.removeEventListener("input", this.#inputChangeHandler);
		this._root.classList.remove("slider");
		this._root.innerHTML = "";
	}
}
