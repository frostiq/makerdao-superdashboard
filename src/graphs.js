var _ = require('lodash');

export function drawRatioChart(collatRatioPoints, filteredRatePoints, minTime, maxTime) {
    var ctx_chart = document.getElementById("collateralization-chart");
    new Chart(ctx_chart, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Collateralization rate',
                backgroundColor: '#FF93A8',
                borderColor: '#FF93A8',
                    fill: false,
                    data: collatRatioPoints
                },
                {
                    label: 'ETH/USD Rate',
                    backgroundColor: 'rgb(64,224,208)',
                    borderColor: 'rgb(64,224,208)',
                    borderDash: [4, 5],
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
                    borderColor: '#FFCB54',
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
                backgroundColor: '#FF93A8',
                borderColor: '#FF93A8',
                    fill: false,
                    data: collateralUsdPoints
                },
                {
                    label: 'Debt amount',
                    lineTension: 0,
                  backgroundColor: '#88C876',
                  borderColor: '#88C876',
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

export function drawEventsChart(debtPoints, minTime, maxTime) {
    var ctx_chart = document.getElementById("events-chart");

    var groupped = _.groupBy(debtPoints, x => x.act);
    var datasets = [];

    for (var key in groupped) {
        datasets.push({
            label: key,
            lineTension: 0,
          backgroundColor: '#C38FF7',
          borderColor: '#C38FF7',
            fill: false,
            data: groupped[key]
        })
    }

    new Chart(ctx_chart, {
        type: 'line',
        data: {
            datasets: datasets
        },
        options: {
            title: {
                text: 'Events Chart'
            },
            maintainAspectRatio: false,
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
                        display: false
                    }
                }]
            }
        }
    });
}
