import { request } from 'graphql-request';

const query = `{
  getCup(id: 1118) {
    actions {
      nodes {
      	time
      	ratio
      }
    }
  }
}
`

function collateralization_chart_func() {
	var timeFormat = 'MM/DD/YYYY HH:mm';

	function newDate(days) {
		return moment().add(days, 'd').toDate();
	}

	function myMap(item)
	{
		return {
			x: item.time,
			y: item.ratio
		};
	}

	function getLinearData()
	{
		return [
			{
				x: newDate(0),
				y: 80,
			},
			{
				x: newDate(1),
				y: 200
			},
			{
				x: newDate(2),
				y: 150
			},
					{
				x: newDate(3),
				y: 270
			},
			{
				x: newDate(4),
				y: 360
			},
			{
				x: newDate(5),
				y: 100
			}
		];
	}

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
								min: 100,
								max: 500
							},
							scaleLabel: {
								display: true,
								labelString: 'Liquidation'
							}
						}]
					},
				}
			});
		});
};

collateralization_chart_func();