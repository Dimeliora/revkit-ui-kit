import Chart from "./charts-config";

export const doughnutChart = ({
	selector,
	title,
	subtitle,
	labels,
	doughnutData,
}) => {
	const root = document.querySelector(selector);
	if (root === null) {
		console.error(
			`Container element "${selector}" for doughnut chart is not available`
		);
		return;
	}

	const canvas = root.querySelector("canvas");
	const ctx = canvas.getContext("2d");

	const data = {
		labels,
		datasets: doughnutData,
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: "60%",
		plugins: {
			legend: {
				position: "right",
				labels: {
					boxWidth: 28,
					boxHeight: 28,
					padding: 25,
					font: {
						size: 14,
						weight: 500,
					},
					generateLabels: (chart) => {
						const [charsData] = chart.data.datasets;
						const labels = chart.data.labels;
						const { data, backgroundColor } = charsData;

						return data.map((value, idx) => ({
							text: `${value}% ${labels[idx]}`,
							borderRadius: 4,
							fontColor: "#728191",
							fillStyle: backgroundColor[idx],
							strokeStyle: backgroundColor[idx],
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
	};

	new Chart(ctx, {
		type: "doughnut",
		data: data,
		options: options,
	});
};
