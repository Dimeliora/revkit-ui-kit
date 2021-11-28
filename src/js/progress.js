export class Progress {
    static progressTypeClassnames = {
        warning: "progress--warning",
        success: "progress--success",
        error: "progress--error",
    };

    /**
     * @param {Object} options - Options object for progress element creation
     * @param {string} options.selector - CSS selector for progress element injection
     * @param {number} [options.value=0] - Initial progress value
     * @param {('warning'|'success'|'error')=} options.type - Progress element styling variant
     */
    constructor({ selector, value = 0, type = null }) {
        this._root = document.querySelector(selector);
        this.value = value;
        this.type = type;

        this.#setup();
    }

    #setup() {
        if (this._root === null) {
            throw new Error("Container element for progress is not available");
        }

        this._root.classList.add("progress");
        if (this.type !== null) {
            this._root.classList.add(
                Progress.progressTypeClassnames[this.type]
            );
        }

        this.onChange(this.value);
    }

    onChange(value) {
        this._root.style.setProperty("--progress-fill-width", `${value}%`);
    }

    destroy() {
        this._root.classList.remove("progress");
        this._root.removeAttribute("style");
        if (this.type !== null) {
            this._root.classList.remove(
                Progress.progressTypeClassnames[this.type]
            );
        }
    }
}
