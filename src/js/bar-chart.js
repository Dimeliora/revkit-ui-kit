import Chart from "./charts-config";

export const barChart = ({ selector, title, subtitle, labels, barsData }) => {
	const root = document.querySelector(selector);
	if (root === null) {
		console.error(
			`Container element "${selector}" for bar chart is not available`
		);
		return;
	}

	const canvas = root.querySelector("canvas");
	const ctx = canvas.getContext("2d");

	const datasets = barsData.map(({ label, data, color }) => ({
		label,
		data,
		borderColor: color,
		backgroundColor: color,
		barThickness: 16,
	}));

	const data = {
		labels,
		datasets,
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					boxWidth: 28,
					boxHeight: 28,
					padding: 45,
					font: {
						size: 14,
						weight: 500,
					},
					generateLabels: (chart) => {
						const datasets = chart.data.datasets;

						return datasets.map((set, idx) => ({
							text: set.label,
							borderRadius: 4,
							fontColor: "#728191",
							fillStyle: set.backgroundColor,
							strokeStyle: set.borderColor,
							datasetIndex: idx,
						}));
					},
				},
			},
			title: {
				display: true,
				text: title,
				align: "start",
				color: "#2C2738",
				font: {
					size: 34,
					weight: 600,
				},
				padding: {
					top: 25,
					bottom: 0,
				},
			},
			subtitle: {
				display: true,
				text: subtitle,
				align: "start",
				color: "#728191",
				font: {
					size: 18,
					weight: 500,
				},
				padding: {
					top: 0,
					bottom: 35,
				},
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
				ticks: {
					padding: 20,
					color: "#728191",
					font: {
						size: 14,
						weight: 500,
					},
				},
			},
			y: {
				grid: {
					borderDash: [4, 4],
					drawBorder: false,
				},
				ticks: {
					padding: 20,
					color: "#728191",
					font: {
						size: 14,
						weight: 500,
					},
					callback: function (value, idx) {
						if (idx % 2 === 0) {
							return value >= 1000 ? `${value / 1000}K` : value;
						}
					},
				},
			},
		},
	};

	new Chart(ctx, {
		type: "bar",
		data: data,
		options: options,
	});
};
