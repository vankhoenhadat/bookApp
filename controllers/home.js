var sidebar = require('../helpers/sidebar');
module.exports = {
	index: function(req, res) {
//res.render('index');


var viewModel = {
	images: [
	{
		uniqueId:       1,
		title:  		'Title image 1',
		description: 	'Desc 1',
		filename:    	'sample1.jpg',
		views: 		0,
		likes: 		0,
		timestamp: 	Date.now
	},{
		uniqueId:       2,
		title:  		'Title image 2',
		description: 	'Desc 2',
		filename:    	'sample1.jpg',
		views: 		0,
		likes: 		0,
		timestamp: 	Date.now
	},{
		uniqueId:       3,
		title:  		'Title image 3',
		description: 	'Desc 3',
		filename:    	'sample1.jpg',
		views: 		0,
		likes: 		0,
		timestamp: 	Date.now
	},{
		uniqueId:       4,
		title:  		'Title image 4',
		description: 	'Desc 4',
		filename:    	'sample1.jpg',
		views: 		0,
		likes: 		0,
		timestamp: 	Date.now
	}
	]
};

// res.render('index', viewModel);
sidebar(viewModel, function(viewModel) {
	res.render('index', viewModel);
});

}
};