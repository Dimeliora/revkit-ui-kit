import { Select } from "./select";
import { Slider } from "./slider";
import { Stepper } from "./stepper";
import { Progress } from "./progress";
import { Rating } from "./rating";

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
		disabled: true,
	});

	new Slider({
		selector: "#form-slider-01",
		value: 75,
	});
	new Slider({
		selector: "#form-slider-02",
		value: 25,
		disabled: true,
	});

	const progressBar_1 = new Progress({
		selector: "#form-progress-01",
		value: 60,
	});
	const progressBar_2 = new Progress({
		selector: "#form-progress-02",
		value: 40,
		type: "warning",
	});
	const progressBar_3 = new Progress({
		selector: "#form-progress-03",
		value: 80,
		type: "success",
	});
	const progressBar_4 = new Progress({
		selector: "#form-progress-04",
		value: 50,
		type: "error",
	});
	setInterval(() => {
		const value = Math.floor(Math.random() * 100);
		progressBar_1.onChange(value);
	}, 1000);
	setInterval(() => {
		const value = Math.floor(Math.random() * 100);
		progressBar_2.onChange(value);
	}, 2000);
	setInterval(() => {
		const value = Math.floor(Math.random() * 100);
		progressBar_3.onChange(value);
	}, 4000);
	setInterval(() => {
		const value = Math.floor(Math.random() * 100);
		progressBar_4.onChange(value);
	}, 3500);

	new Rating({
		selector: "#rating-01",
	});
});
