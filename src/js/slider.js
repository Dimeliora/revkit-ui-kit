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

    #min;
    #max;
    #step;
    #value;
    #disabled;
    #root;
    #input;
    #progress;

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
        this.#root = document.querySelector(selector);
        if (this.#root === null) {
            console.error(
                `Container element "${selector}" for slider is not available`
            );
            return;
        }

        this.#min = min;
        this.#max = max;
        this.#step = step;
        this.#value = value;
        this.#disabled = disabled;

        this.#render();
        this.#setup();
    }

    get value() {
        return this.#value;
    }

    #render() {
        this.#root.classList.add("slider");

        this.#root.innerHTML = Slider.createHTMLTemplate(
            this.#min,
            this.#max,
            this.#step,
            this.#value,
            this.#disabled
        );
    }

    #setup() {
        this.#input = this.#root.querySelector(".slider__input");
        this.#progress = this.#root.querySelector(".slider__progress");

        this.#updateSliderProgress(this.#input.value);

        if (!this.#disabled) {
            this.#input.addEventListener("input", this.#inputChangeHandler);
        }
    }

    #inputChangeHandler = ({ target }) => {
        this.#value = Number(target.value);
        this.#updateSliderProgress(target.value);
    };

    #updateSliderProgress(value) {
        this.#progress.style.setProperty("width", `${value}%`);
    }

    destroy() {
        this.#input.removeEventListener("input", this.#inputChangeHandler);
        this.#root.classList.remove("slider");
        this.#root.innerHTML = "";
    }
}
