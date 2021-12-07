export const headerMenuHandler = (selector) => {
    const header = document.querySelector(selector);

    if (header === null) {
        console.error(`Header ${selector} is not available`);
        return;
    }

    const menu = header.querySelector("[data-header-menu]");
    const menuButton = header.querySelector("[data-header-button]");
    const menuCloseButton = header.querySelector("[data-header-menu-close]");

    menuButton.addEventListener("click", () => {
        menu.classList.add("header__navigation--active");
        menuButton.classList.add("header__menu-button--active");

        document.body.style.overflow = "hidden";
    });

    menuCloseButton.addEventListener("click", () => {
        menu.classList.remove("header__navigation--active");
        menuButton.classList.remove("header__menu-button--active");

        document.body.removeAttribute("style");
    });
};
