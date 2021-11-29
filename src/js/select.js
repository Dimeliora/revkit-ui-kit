export class Select {
	static createHTMLTemplate(
		label,
		placeholder,
		data,
		value,
		selected,
		disabled
	) {
		const options = data.map(({ value }, idx) => {
			let optionActiveClass = "";
			if (selected === idx) {
				optionActiveClass = "select__option--selected";
			}

			return `
            <li
                class="select__option ${optionActiveClass}"
                data-select-element="option"
                data-option-idx="${idx}"
            >
                ${value}
            </li>
            `;
		});

		const numOfExistingSelects =
			document.querySelectorAll(".select").length;
		const currentSelectLabelId = `select-label-${String(
			numOfExistingSelects
		).padStart(2, "0")}`;

		const selectTabIndex = disabled ? "-1" : "0";

		const text = value ? value : placeholder;

		return `
            <div
                class="select__label"
                id="${currentSelectLabelId}"
                data-select-element="label"
            >
                ${label}
            </div>
            <div
                class="select__field"
                tabindex="${selectTabIndex}"
                role="button"
                aria-labelledby=${currentSelectLabelId}
                data-select-element="field"
            >
                <span
					class="select__text"
					data-select-element="text"
				>
					${text}
				</span>
                <svg
					class="select__icon"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
                    <path
						d="M4 8L12 16L20 8"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
                </svg>
            </div>
            <div
                class="select__dropdown"
                role="list"
                aria-expanded="false"
                data-select-element="dropdown"
            >
                <ul class="select__list">
                    ${options.join(" ")}
                </ul>
            </div>
        `;
	}

	/**
	 * @param {Object} options - Options object for custom select creation
	 * @param {string} options.selector - CSS selector for custom select element injection
	 * @param {string} [options.label='Label'] - Text for select label
	 * @param {string} [options.placeholder='Dropdown'] - Placeholder for select field
	 * @param {Object[]} [options.data=[]] - Array of objects for select options creation
	 * @param {string} options.data.value - Value for select option
	 * @param {?number=} options.selected - Index of selected option
	 * @param {boolean} [options.disabled=false] - Disabled attribute, makes the select element not focusable
	 */

	#label;
	#placeholder;
	#data;
	#selected;
	#disabled;
	#root;
	#selectLabel;
	#selectField;
	#selectText;
	#selectDropdown;
	#value = "";

	constructor({
		selector,
		label = "Label",
		placeholder = "Dropdown",
		data = [],
		selected = null,
		disabled = false,
	}) {
		this.#root = document.querySelector(selector);
		if (this.#root === null) {
			console.error(
				`Container element "${selector}" for select is not available`
			);
			return;
		}

		this.#label = label;
		this.#placeholder = placeholder;
		this.#data = data;
		this.#selected = selected;
		this.#disabled = disabled;

		this.#render();
		this.#setup();
	}

	get value() {
		return this.#value;
	}

	#render() {
		this.#root.classList.add("select");
		if (this.#disabled) {
			this.#root.classList.add("select--disabled");
		}

		if (
			this.#selected !== null &&
			this.#selected >= 0 &&
			this.#selected < this.#data.length
		) {
			this.#value = this.#data[this.#selected].value;
		}

		this.#root.innerHTML = Select.createHTMLTemplate(
			this.#label,
			this.#placeholder,
			this.#data,
			this.#value,
			this.#selected,
			this.#disabled
		);
	}

	#setup() {
		this.#selectLabel = this.#root.querySelector(
			'[data-select-element="label"]'
		);
		this.#selectField = this.#root.querySelector(
			'[data-select-element="field"]'
		);
		this.#selectText = this.#root.querySelector(
			'[data-select-element="text"]'
		);
		this.#selectDropdown = this.#root.querySelector(
			'[data-select-element="dropdown"]'
		);

		if (!this.#disabled) {
			this.#root.addEventListener("click", this.#selectClickHandler);
			this.#root.addEventListener("keydown", this.#selectKeyboardHandler);
			this.#selectLabel.addEventListener(
				"click",
				this.#labelClickHandler
			);
			document.addEventListener("click", this.#outsideClickHandler);
		}
	}

	#selectClickHandler = (e) => {
		if (e.target.closest('[data-select-element="field"]')) {
			this.#fieldStateHandler();
			return;
		}

		if (e.target.closest('[data-select-element="option"]')) {
			this.#selected = Number(e.target.dataset.optionIdx);
			this.#optionsStateHandler();
			this.close();
			return;
		}
	};

	#selectKeyboardHandler = (e) => {
		switch (e.key) {
			case "Tab":
				this.close();
				return;

			case "Enter":
				e.preventDefault();
				this.#fieldStateHandler();
				return;

			case " ":
				e.preventDefault();
				this.open();
				return;

			case "Escape":
				e.preventDefault();
				this.close();
				return;

			case "ArrowUp":
				e.preventDefault();
				this.#selectOptionByKeyboardHandler(-1);
				return;

			case "ArrowDown":
				e.preventDefault();
				this.#selectOptionByKeyboardHandler(1);
				return;

			default:
				return;
		}
	};

	#selectOptionByKeyboardHandler = (step) => {
		if (this.#selected === null && step < 0) {
			return;
		}

		if (this.#selected === null && step > 0) {
			this.#selected = 0;
		} else {
			this.#selected += step;
		}

		this.#selected = Math.max(0, this.#selected);
		this.#selected = Math.min(this.#selected, this.#data.length - 1);

		this.#optionsStateHandler();
	};

	#fieldStateHandler = () => {
		if (this.#root.classList.contains("select--opened")) {
			this.close();
		} else {
			this.open();
		}
	};

	#optionsStateHandler = () => {
		this.#value = this.#data[this.#selected].value;
		this.#selectText.textContent = this.#value;

		const options = this.#root.querySelectorAll(
			'[data-select-element="option"]'
		);
		options.forEach((option) => {
			option.classList.remove("select__option--selected");

			if (Number(option.dataset.optionIdx) === this.#selected) {
				option.classList.add("select__option--selected");
			}
		});
	};

	#outsideClickHandler = (e) => {
		if (!e.composedPath().includes(this.#root)) {
			this.close();
		}
	};

	#labelClickHandler = () => {
		this.#selectField.focus();
		this.close();
	};

	open() {
		this.#root.classList.add("select--opened");
		this.#selectDropdown.setAttribute("aria-expanded", "true");
	}

	close() {
		this.#root.classList.remove("select--opened");
		this.#selectDropdown.setAttribute("aria-expanded", "false");
	}

	destroy() {
		this.#root.removeEventListener("click", this.#selectClickHandler);
		this.#root.removeEventListener("keydown", this.#selectKeyboardHandler);
		this.#selectLabel.removeEventListener("click", this.#labelClickHandler);
		document.removeEventListener("click", this.#outsideClickHandler);

		this.#root.classList.remove("select", "select--disabled");
		this.#root.innerHTML = "";
	}
}
