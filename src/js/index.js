import { Select } from "./select";
import { Slider } from "./slider";
import { Stepper } from "./stepper";
import { Progress } from "./progress";
import { Rating } from "./rating";
import { moreMenuHandler } from "./moreMenu";
import { barChart } from "./bar-chart";
import { lineChart } from "./line-chart";
import { doughnutChart } from "./doughnut-chart";
import { formValidationOnSubmit } from "./form-validation";

const SELECT_ITEMS = [
    {
        value: "Item 1",
    },
    {
        value: "Item 2",
    },
    {
        value: "Item 3",
    },
    {
        value: "Item 4",
    },
];

window.addEventListener("DOMContentLoaded", () => {
    window["form-select-01"] &&
        new Select({
            selector: "#form-select-01",
            data: SELECT_ITEMS,
        });
    window["form-select-02"] &&
        new Select({
            selector: "#form-select-02",
            data: SELECT_ITEMS,
            selected: 1,
        });
    window["form-select-03"] &&
        new Select({
            selector: "#form-select-03",
            data: SELECT_ITEMS,
            disabled: true,
        });

    window["form-stepper-01"] &&
        new Stepper({
            selector: "#form-stepper-01",
            value: 1,
            max: 5,
        });
    window["form-stepper-02"] &&
        new Stepper({
            selector: "#form-stepper-02",
            value: 1,
            disabled: true,
        });

    window["form-slider-01"] &&
        new Slider({
            selector: "#form-slider-01",
            value: 75,
        });
    window["form-slider-02"] &&
        new Slider({
            selector: "#form-slider-02",
            value: 25,
            disabled: true,
        });

    if (window["form-progress-01"]) {
        const progressBar_1 = new Progress({
            selector: "#form-progress-01",
            value: 60,
        });
        setInterval(() => {
            const value = Math.floor(Math.random() * 100);
            progressBar_1.onChange(value);
        }, 1000);
    }

    if (window["form-progress-02"]) {
        const progressBar_2 = new Progress({
            selector: "#form-progress-02",
            value: 40,
            type: "warning",
        });
        setInterval(() => {
            const value = Math.floor(Math.random() * 100);
            progressBar_2.onChange(value);
        }, 2000);
    }

    if (window["form-progress-03"]) {
        const progressBar_3 = new Progress({
            selector: "#form-progress-03",
            value: 80,
            type: "success",
        });
        setInterval(() => {
            const value = Math.floor(Math.random() * 100);
            progressBar_3.onChange(value);
        }, 4000);
    }

    if (window["form-progress-04"]) {
        const progressBar_4 = new Progress({
            selector: "#form-progress-04",
            value: 50,
            type: "error",
        });
        setInterval(() => {
            const value = Math.floor(Math.random() * 100);
            progressBar_4.onChange(value);
        }, 3500);
    }

    window["rating-01"] &&
        new Rating({
            selector: "#rating-01",
        });
    window["rating-02"] &&
        new Rating({
            selector: "#rating-02",
            initialRatings: {
                1: 2,
                2: 1,
                3: 2,
                4: 5,
                5: 12,
            },
        });

    moreMenuHandler({
        selector: ".callout--micro",
        activeClass: "callout__actions--active",
    });
    moreMenuHandler({
        selector: ".card--menu",
        activeClass: "card__actions--active",
    });

    if (window["bar-chart"]) {
        barChart({
            selector: "#bar-chart",
            title: "443K Pageviews",
            subtitle: "in last 7 days",
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            barsData: [
                {
                    label: "Pageviews",
                    data: [30300, 26200, 12040, 22130, 29015, 31990, 24400],
                    color: "#D6CF6E",
                },
                {
                    label: "Conversions",
                    data: [40300, 33240, 16120, 29970, 37320, 42010, 31860],
                    color: "#14A38B",
                },
            ],
        });
    }
    if (window["line-chart"]) {
        lineChart({
            selector: "#line-chart",
            title: "984 Signups",
            subtitle: "in last 7 days",
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            linesData: [
                {
                    label: "Fill Variant",
                    data: [10, 105, 102, 41, 58, 153, 180],
                    color: "#D6CF6E",
                },
                {
                    label: "Ghost Variant",
                    data: [185, 146, 55, 49, 100, 107, 61],
                    color: "#14A38B",
                },
            ],
        });
    }
    if (window["doughnut-chart"]) {
        doughnutChart({
            selector: "#doughnut-chart",
            title: "Sale Channels",
            subtitle: "in last 7 days",
            labels: ["Web", "Mobile", "Socials"],
            doughnutData: [
                {
                    label: "Sale Channels",
                    data: [35, 45, 20],
                    backgroundColor: ["#14A38B", "#D6CF6E", "#0880AE"],
                    borderWidth: 0,
                },
            ],
        });
    }

    window["form-contact"] &&
        formValidationOnSubmit({
            selector: "#form-contact",
            onSubmit: console.log,
        });
    window["form-sign-up"] &&
        formValidationOnSubmit({
            selector: "#form-sign-up",
            onSubmit: console.log,
        });
    window["form-reset-password"] &&
        formValidationOnSubmit({
            selector: "#form-reset-password",
            onSubmit: console.log,
        });
});
