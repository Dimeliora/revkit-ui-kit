import {
	Chart,
	CategoryScale,
	LinearScale,
	BarController,
	BarElement,
	LineController,
	LineElement,
	PointElement,
	DoughnutController,
	ArcElement,
	Legend,
	Title,
	Tooltip,
	SubTitle,
} from "chart.js";

Chart.register(
	CategoryScale,
	LinearScale,
	BarController,
	BarElement,
	LineController,
	LineElement,
	PointElement,
	DoughnutController,
	ArcElement,
	Legend,
	Title,
	Tooltip,
	SubTitle
);

Chart.defaults.font.family = "IBM Plex Sans, sans-serif";

export default Chart;
