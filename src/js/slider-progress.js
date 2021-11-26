export class SliderProgress {
    constructor(selector) {
        this._root = document.querySelector(selector);

        this.#setup();
    }

    #setup() {
        if (this._root === null) {
            throw new Error("DOM element not found");
        }

        this._input = this._root.querySelector(".slider__input");
        this._progress = this._root.querySelector(".slider__progress");
        this.#updateSliderProgress(this._input.value);

        this._input.addEventListener("input", this.#inputChangeHandler);
    }

    #inputChangeHandler = (e) => {
        this.#updateSliderProgress(e.target.value);
    };

    #updateSliderProgress = (value) => {
        this._progress.style.setProperty("width", `${value}%`);
    };

    destroy() {
        this.#updateSliderProgress(0);
        this._input.removeEventListener("input", this.#inputChangeHandler);
    }
}
