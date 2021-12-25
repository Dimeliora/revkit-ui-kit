export class Progress {
  static createHTMLTemplate() {
    return `
	  	<div class="progress__filler" data-progress-filler></div>
	`;
  }

  static progressTypeClassnames = {
    warning: "progress--warning",
    success: "progress--success",
    error: "progress--error",
  };

  #value;
  #type;
  #root;
  #filler;

  /**
   * @param {Object} options - Options object for progress element creation
   * @param {string} options.selector - CSS selector for progress element injection
   * @param {number} [options.value=0] - Initial progress value
   * @param {?('warning'|'success'|'error')=} options.type - Progress element styling variant
   */
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

    this.#render();
    this.#setup();
  }

  #render() {
    this.#root.classList.add("progress");
    this.#root.innerHTML = Progress.createHTMLTemplate();

    if (this.#type !== null) {
      this.#root.classList.add(Progress.progressTypeClassnames[this.#type]);
    }
  }

  #setup() {
    this.#filler = this.#root.querySelector("[data-progress-filler]");

    this.onChange(this.#value);
  }

  onChange(value) {
    if (this.#root !== null) {
      this.#filler.style.setProperty("width", `${value}%`);
    }
  }

  destroy() {
    this.#root.classList.remove("progress");
    if (this.#type !== null) {
      this.#root.classList.remove(Progress.progressTypeClassnames[this.#type]);
    }

    this.#root.innerHTML = "";
  }
}
