export function drawRatioChart(collatRatioPoints, filteredRatePoints) {
    var ctx_chart = document.getElementById("collateralization-chart");
    new Chart(ctx_chart, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Collateralization rate',
                    backgroundColor: 'black',
                    borderColor: 'orange',
                    fill: false,
                    data: collatRatioPoints
                },
                {
                    label: 'ETH/USD Rate',
                    backgroundColor: 'black',
                    borderColor: 'grey',
                    fill: false,
                    data: filteredRatePoints
                }]
        },
        options: {
            title: {
                text: 'CDP Chart'
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    time: {
                        unit: 'day'
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 100
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Сollateral-to-debt Ratio, %'
                    }
                }]
            },
        }
    });
}

export function drawScatterChart(mdTimeSeries, minTime, maxTime) {
    var ctx_scatter = document.getElementById("collateralization-scatter");
    new Chart(ctx_scatter, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'MakerDAO Operations',
                borderColor: 'rgb(255, 99, 132)',
                fill: false,
                data: mdTimeSeries
            }]
        },
        options: {
            title: {
                text: 'CDP Chart'
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    time: {
                        unit: 'day',
                        min: minTime,
                        max: maxTime
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 100
                    },
                    scaleLabel: {
                        display: true,
                    }
                }]
            },
        }
    });
}