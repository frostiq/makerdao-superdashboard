import { request } from 'graphql-request';
import { drawRatioChart, drawScatterChart, drawBalanceChart, drawEventsChart } from './graphs.js';
const _ = require('lodash');

function collateralization_chart_func() {

    function reloadData(cdp_id) {
        var query = '{ getCup(id:' + cdp_id + ') { actions { nodes {act time ratio ink art pip tab} } } }';

        request('https://graphql.makerdao.com/v1', query).then(data => {
            var cdp_data = data.getCup.actions.nodes.map(function (item) {
                return {
                    time: moment(item.time),
                    ratio: item.ratio,
                    ink: item.ink,
                    art: item.art,
                    pip: item.pip,
                    tab: item.tab,
                    act: item.act
                };
            });

            axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=100&aggregate=1')
                .then(function (response) {
                    var rates = response.data.Data.map(function (item) {
                        return {
                            x: moment.unix(item.time),
                            y: item.close
                        };
                    });

                    var minTime = _.min(cdp_data.map(p => p.time))
                    var maxTime = _.max(cdp_data.map(p => p.time))

                    var filteredRatePoints = rates.filter(p => p.x.isAfter(minTime) && p.x.isBefore(maxTime));

                    // adding the first point artificially
                    filteredRatePoints.unshift({
                        x: minTime,
                        y: filteredRatePoints[0].y
                    });

                    var collatRatioPoints = filteredRatePoints.map(i => {
                        var currentDt = i.x;

                        var previous_cdp_states = cdp_data.filter(p => p.time.isSameOrBefore(currentDt))
                        var cdp_state = _.maxBy(previous_cdp_states, x => x.time);

                        var ratio = 100 * cdp_state.ink * i.y / cdp_state.art;

                        return { x: currentDt, y: ratio };
                    });


                    drawRatioChart(collatRatioPoints, filteredRatePoints, minTime, maxTime);

                    var mdTimeSeries = cdp_data.map(function (item) {
                        return {
                            x: item.time.toDate(),
                            y: item.ratio
                        };
                    });

                    drawScatterChart(mdTimeSeries, minTime, maxTime);

                    var debtTimeSeries = cdp_data.map(function (item) {
                        return {
                            x: item.time.toDate(),
                            y: item.art
                        };
                    });

                    var collateralUsdTimeSeries = cdp_data.map(function (item) {
                        return {
                            x: item.time.toDate(),
                            y: item.tab
                        };
                    });

                    drawBalanceChart(debtTimeSeries, collateralUsdTimeSeries, minTime, maxTime);

                    var labels = cdp_data.map(x => x.act);

                    var eventsTimeSeries = cdp_data.map(function (item) {
                        return {
                            x: item.time.toDate(),
                            y: 0
                        };
                    });

                    drawEventsChart(eventsTimeSeries, labels, minTime, maxTime)
                });
        });
    };

    document.getElementById('update').addEventListener('click', function () {
        var cdp_id = document.getElementById('cdp-id').value;
        reloadData(cdp_id);
    });
};

collateralization_chart_func();