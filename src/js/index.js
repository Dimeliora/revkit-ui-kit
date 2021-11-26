import { Select } from "./select";

const SELECT_ITEMS = [
    {
        id: "1",
        value: "Item 1",
    },
    {
        id: "2",
        value: "Item 2",
    },
    {
        id: "3",
        value: "Item 3",
    },
    {
        id: "4",
        value: "Item 4",
    },
];

document.addEventListener("DOMContentLoaded", () => {
    new Select({
        selector: "#form-select-01",
        data: SELECT_ITEMS,
    });
    new Select({
        selector: "#form-select-02",
        data: SELECT_ITEMS,
        selected: 1,
    });
    new Select({
        selector: "#form-select-03",
        data: SELECT_ITEMS,
        disabled: true,
    });
});
