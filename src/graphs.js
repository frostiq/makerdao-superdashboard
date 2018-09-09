export function drawRatioChart(collatRatioPoints, filteredRatePoints, minTime, maxTime) {
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
            plugins: {
                datalabels: {
                    display: false
                }
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
                        labelString: 'Сollateral-to-debt Ratio, %'
                    }
                }]
            },
            annotation: {
                annotations: [
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-0',
                        value: '150',
                        borderColor: 'red',
                        borderWidth: 2,
                    }
                ]
            }
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
            plugins: {
                datalabels: {
                    display: false
                }
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

export function drawBalanceChart(debtPoints, collateralUsdPoints, minTime, maxTime) {
    var ctx_chart = document.getElementById("balance-chart");
    new Chart(ctx_chart, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Collateral amount',
                    lineTension: 0,
                    backgroundColor: 'black',
                    borderColor: 'orange',
                    fill: false,
                    data: collateralUsdPoints
                },
                {
                    label: 'Debt amount',
                    lineTension: 0,
                    backgroundColor: 'black',
                    borderColor: 'grey',
                    fill: false,
                    data: debtPoints
                }]
        },
        options: {
            title: {
                text: 'CDP Chart'
            },
            plugins: {
                datalabels: {
                    display: false
                }
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
                        //min: 100
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Amount, USD'
                    }
                }]
            },
        }
    });
}

export function drawEventsChart(debtPoints, labels, minTime, maxTime) {
    var ctx_chart = document.getElementById("events-chart");
    new Chart(ctx_chart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Events',
                    lineTension: 0,
                    backgroundColor: 'black',
                    borderColor: 'orange',
                    fill: false,
                    data: debtPoints
                }
            ]
        },
        options: {
            title: {
                text: 'Events Chart'
            },
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    backgroundColor: function (context) {
                        return context.dataset.backgroundColor;
                    },
                    borderRadius: 4,
                    color: 'white',
                    rotation: -90,
                    // font: {
                    //     weight: 'bold'
                    // },
                    formatter: function (value, context) {
                        return context.chart.data.labels[context.dataIndex];
                    }
                }
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
                        display: false
                    }
                }]
            }
        }
    });
}