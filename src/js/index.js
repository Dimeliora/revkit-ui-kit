import { Select } from "./select";
import { SliderProgress } from "./slider-progress";
import { Stepper } from "./stepper";

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

    new Stepper({
        selector: "#form-stepper-01",
        value: 1,
        max: 5,
    });
    new Stepper({
        selector: "#form-stepper-02",
        value: 1,
        max: 10,
        step: 2,
    });
    new Stepper({
        selector: "#form-stepper-03",
        value: 1,
    });
    new Stepper({
        selector: "#form-stepper-04",
        value: 1,
        disabled: true,
    });

    new SliderProgress("#form-slider-01");
    new SliderProgress("#form-slider-02");
});
