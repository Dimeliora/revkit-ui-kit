export const barChart = (selector) => {
    const root = document.querySelector(selector);
    if (root === null) {
        console.error(
            `Container element "${selector}" for bar chart is not available`
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
                label: "Pageviews",
                data: [30300, 26200, 12040, 22130, 29015, 31990, 24400],
                borderColor: "#D6CF6E",
                backgroundColor: "#D6CF6E",
                barThickness: 16,
            },
            {
                label: "Conversions",
                data: [40300, 33240, 16120, 29970, 37320, 42010, 31860],
                borderColor: "#14A38B",
                backgroundColor: "#14A38B",
                barThickness: 16,
            },
        ],
    };

    const options = {
        responsive: false,
        elements: {
            bar: { barThickness: 16 },
        },
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
                text: "443K Pageviews",
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
                            return `${value / 1000}K`;
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
