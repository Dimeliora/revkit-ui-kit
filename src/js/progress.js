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

	#value;
	#type;
	#root;

	constructor({ selector, value = 0, type = null }) {
		this.#root = document.querySelector(selector);
		if (this.#root === null) {
			console.error(
				`Container element "${selector}" for progress is not available`
			);
			return;
		}

		this.#value = value;
		this.#type = type;

		this.#setup();
	}

	#setup() {
		this.#root.classList.add("progress");
		if (this.#type !== null) {
			this.#root.classList.add(
				Progress.progressTypeClassnames[this.#type]
			);
		}

		this.onChange(this.#value);
	}

	onChange(value) {
		if (this.#root !== null) {
			this.#root.style.setProperty("--progress-fill-width", `${value}%`);
		}
	}

	destroy() {
		this.#root.classList.remove("progress");
		this.#root.removeAttribute("style");
		if (this.#type !== null) {
			this.#root.classList.remove(
				Progress.progressTypeClassnames[this.#type]
			);
		}
	}
}
