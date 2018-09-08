const { request } = require('graphql-request')

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

request('https://graphql.makerdao.com/v1', query).then(data => showDataInformation(data))

function showDataInformation(dataArray) {
	for (var i = 0; i < dataArray.getCup.actions.nodes.length; i++) {
		console.log(dataArray.getCup.actions.nodes[0]);
	}
}