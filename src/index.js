import { request } from 'graphql-request';

function collateralization_chart_func() {
	var timeFormat = 'MM/DD/YYYY HH:mm';

	function myMap(item)
	{
		return {
			x: item.time,
			y: item.ratio
		};
	}

	function reloadData(cdp_id)
	{
		var query = '{ getCup(id:' + cdp_id + ') { actions { nodes {time ratio} } } }';

			request('https://graphql.makerdao.com/v1', query).then(data => {
			var timeSeries = data.getCup.actions.nodes.map(myMap);

			var ctx = document.getElementById("collateralization-chart");
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					datasets: [{
						label: 'Line',
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						fill: false,
						data: timeSeries
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
								labelString: 'Сollateral-to-debt Ratio '
							}
						}]
					},
				}
			});
		});
	};

	document.getElementById('update').addEventListener('click', function() {
		var cdp_id = document.getElementById('cdp-id').value;
		reloadData(cdp_id);
	});
};

collateralization_chart_func();