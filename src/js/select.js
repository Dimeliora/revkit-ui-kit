export class Select {
    static getHTMLTemplate(label, placeholder, data, selected) {
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

        let text = placeholder;
        if (selected !== null) {
            text = data[selected].value;
        }

        const createdSelectElements = document.querySelectorAll(".select");
        const currentSelectLabelId = `select-label-${String(
            createdSelectElements.length
        ).padStart(2, "0")}`;

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
                tabindex="0"
                role="button"
                aria-labelledby=${currentSelectLabelId}
                data-select-element="field"
            >
                <span class="select__text" data-select-element="text">${text}</span>
                <svg class="select__icon">
                    <use
                        href="/icons/icon-sprite.svg#chevron-down-arrow"
                    ></use>
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

    constructor({
        selector,
        label = "Label",
        placeholder = "Dropdown",
        data = [],
        selected = null,
        disabled = false,
    }) {
        this._root = document.querySelector(selector);
        this._label = label;
        this._placeholder = placeholder;
        this._data = data;
        this._selected = selected;
        this.disabled = disabled;

        this.#render();
        this.#setup();
    }

    #render() {
        if (this._root === null) {
            throw new Error("Container element for select is not available");
        }

        this._root.classList.add("select");
        if (this.disabled) {
            this._root.classList.add("select--disabled");
        }

        this._root.insertAdjacentHTML(
            "afterBegin",
            Select.getHTMLTemplate(
                this._label,
                this._placeholder,
                this._data,
                this._selected
            )
        );
    }

    #setup() {
        this.value = null;
        this._selectLabel = this._root.querySelector(
            '[data-select-element="label"]'
        );
        this._selectField = this._root.querySelector(
            '[data-select-element="field"]'
        );
        this._selectText = this._root.querySelector(
            '[data-select-element="text"]'
        );
        this._selectDropdown = this._root.querySelector(
            '[data-select-element="dropdown"]'
        );

        this._root.addEventListener("click", this.#selectClickHandler);
        this._root.addEventListener("keydown", this.#selectKeyboardHandler);
        this._selectLabel.addEventListener("click", this.#labelClickHandler);
        document.addEventListener("click", this.#outsideClickHandler);
    }

    #selectClickHandler = (e) => {
        if (e.target.closest('[data-select-element="field"]')) {
            this.#fieldStateHandler();
            return;
        }

        if (e.target.closest('[data-select-element="option"]')) {
            this._selected = Number(e.target.dataset.optionIdx);
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
        if (this._selected === null && step < 0) {
            return;
        }

        if (this._selected === null && step > 0) {
            this._selected = 0;
        } else {
            this._selected += step;
        }

        this._selected = Math.max(0, this._selected);
        this._selected = Math.min(this._selected, this._data.length - 1);

        this.#optionsStateHandler();
    };

    #fieldStateHandler = () => {
        if (this._root.classList.contains("select--opened")) {
            this.close();
        } else {
            this.open();
        }
    };

    #optionsStateHandler = () => {
        this.value = this._data[this._selected].value;
        this._selectText.textContent = this.value;

        const options = this._root.querySelectorAll(
            '[data-select-element="option"]'
        );
        options.forEach((option) => {
            option.classList.remove("select__option--selected");

            if (Number(option.dataset.optionIdx) === this._selected) {
                option.classList.add("select__option--selected");
            }
        });
    };

    #outsideClickHandler = (e) => {
        if (!e.composedPath().includes(this._root)) {
            this.close();
        }
    };

    #labelClickHandler = () => {
        this._selectField.focus();
        this.close();
    };

    open() {
        this._root.classList.add("select--opened");
        this._selectDropdown.setAttribute("aria-expanded", "true");
    }

    close() {
        this._root.classList.remove("select--opened");
        this._selectDropdown.setAttribute("aria-expanded", "false");
    }

    destroy() {
        this._root.removeEventListener("click", this.#selectClickHandler);
        this._root.removeEventListener("keydown", this.#selectKeyboardHandler);
        this._selectLabel.removeEventListener("click", this.#labelClickHandler);
        document.removeEventListener("click", this.#outsideClickHandler);

        this._root.classList.remove("select", "select--disabled");
        this._root.innerHTML = "";
    }
}
