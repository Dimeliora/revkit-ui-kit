export const lineChart = (selector) => {
    const root = document.querySelector(selector);
    if (root === null) {
        console.error(
            `Container element "${selector}" for line chart is not available`
        );
        return;
    }

    const canvas = root.querySelector("canvas");
    canvas.style = "width: 560px; height: 500px";
    const ctx = canvas.getContext("2d");

    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Fill Variant",
                data: [10, 105, 102, 41, 58, 153, 180],
                fill: false,
                borderColor: "#D6CF6E",
                backgroundColor: "#D6CF6E",
                tension: 0.5,
            },
            {
                label: "Ghost Variant",
                data: [185, 146, 55, 49, 100, 107, 61],
                fill: false,
                borderColor: "#14A38B",
                backgroundColor: "#14A38B",
                tension: 0.5,
            },
        ],
    };

    const options = {
        responsive: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 28,
                    boxHeight: 28,
                    padding: 45,
                    color: "#7C9CBF",
                    font: {
                        family: "IBM Plex Sans, sans-serif",
                        size: 14,
                        weight: 500,
                    },
                },
            },
            title: {
                display: true,
                align: "start",
                color: "#2C2738",
                font: {
                    family: "IBM Plex Sans, sans-serif",
                    size: 34,
                    weight: 600,
                },
                padding: {
                    top: 25,
                    bottom: 0,
                },
                text: "984 Signups",
            },
            subtitle: {
                display: true,
                align: "start",
                color: "#728191",
                font: {
                    family: "IBM Plex Sans, sans-serif",
                    size: 18,
                    weight: 500,
                },
                padding: {
                    top: 0,
                    bottom: 35,
                },
                text: "in last 7 days",
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
                        family: "IBM Plex Sans, sans-serif",
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
                        family: "IBM Plex Sans, sans-serif",
                        size: 14,
                        weight: 500,
                    },
                    callback: function (value, idx) {
                        if (idx % 2 === 0) {
                            return value;
                        }
                    },
                },
            },
        },
    };

    new Chart(ctx, {
        type: "line",
        data: data,
        options: options,
    });
};
