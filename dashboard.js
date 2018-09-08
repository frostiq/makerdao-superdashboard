const { request } = require('graphql-request')

function requestCupActions() {
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
}

function printDocData(jsonResponse) {
	for (var i = 0; i < jsonResponse.getCup.actions.nodes.length; i++) {
		console.log(jsonResponse.getCup.actions.nodes[2]);
	}
}

requestCupActions()