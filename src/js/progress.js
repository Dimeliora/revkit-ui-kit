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
	 * @param {?('warning'|'success'|'error')=} options.type - Progress element styling variant
	 */
	constructor({ selector, value = 0, type = null }) {
		this._root = document.querySelector(selector);
		if (this._root === null) {
			console.error(
				`Container element "${selector}" for progress is not available`
			);
			return;
		}

		this._value = value;
		this._type = type;

		this.#setup();
	}

	#setup() {
		this._root.classList.add("progress");
		if (this._type !== null) {
			this._root.classList.add(
				Progress.progressTypeClassnames[this._type]
			);
		}

		this.onChange(this._value);
	}

	onChange(value) {
		if (this._root !== null) {
			this._root.style.setProperty("--progress-fill-width", `${value}%`);
		}
	}

	destroy() {
		this._root.classList.remove("progress");
		this._root.removeAttribute("style");
		if (this._type !== null) {
			this._root.classList.remove(
				Progress.progressTypeClassnames[this._type]
			);
		}
	}
}
