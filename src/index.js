import { request } from 'graphql-request';

function collateralization_chart_func() {
	var timeFormat = 'MM/DD/YYYY HH:mm';


	function cdpMap(item)
	{
		return {
			time: moment(item.time),
			ratio: item.ratio,
			ink: item.ink,
			art: item.art,
			pip: item.pip
		};
	}

	function timeSeriesMap(item)
	{
		return {
			x: item.time.toDate(),
			y: item.ratio
		};
	}

	function rateMap(item)
	{
		return {
			x: moment.unix(item.time),
			y: item.close
		};
	}

	function reloadData(cdp_id)
	{
		var query = '{ getCup(id:' + cdp_id + ') { actions { nodes {time ratio ink art pip} } } }';

		request('https://graphql.makerdao.com/v1', query).then(data => {
			var cdp_data = data.getCup.actions.nodes.map(cdpMap);
			
			axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=100&aggregate=1')
			 	.then(function(response) {
			 		var rates = response.data.Data.map(rateMap);

			 		var firstDate = cdp_data.map(p => p.time).sort(function(a,b) {
        				return b.isBefore(a);
   					 })[0];

			 		var filteredRatePoints = rates.filter(p => firstDate.isBefore(p.x));

			 		var perDayPoints = new Array();
			 		filteredRatePoints.forEach(i => {
			 			var target_cdp_state = cdp_data.filter(p => firstDate.isBefore(p.x))[0];
			 			var ratio = 100 * target_cdp_state.ink * i.y / target_cdp_state.art;

			 			perDayPoints.push({x: i.x, y: ratio });
			 		});

			 		var ctx = document.getElementById("collateralization-chart");

			 		var mdTimeSeries = cdp_data.map(timeSeriesMap);

					var myChart = new Chart(ctx, {
					type: 'line',
					data: {
					datasets: [{
						label: 'Makerdao',
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						fill: false,
						data: mdTimeSeries
					},
					{
						label: 'We',
						backgroundColor: 'rgb(255, 165, 0)',
						borderColor: 'rgb(255, 99, 132)',
						fill: false,
						data: perDayPoints
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
							time:{
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
			});
		});
	};

	document.getElementById('update').addEventListener('click', function() {
		var cdp_id = document.getElementById('cdp-id').value;
		reloadData(cdp_id);
	});
};

collateralization_chart_func();