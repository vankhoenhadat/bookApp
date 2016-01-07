var sidebar = require('../helpers/sidebar');
var ImageModel = require('../models').Image;
module.exports = {
	index: function(req, res) {
//res.render('index');


// var viewModel = {
// 	images: [
// 	{
// 		uniqueId:       1,
// 		title:  		'Title image 1',
// 		description: 	'Desc 1',
// 		filename:    	'sample1.jpg',
// 		views: 		0,
// 		likes: 		0,
// 		timestamp: 	Date.now
// 	},{
// 		uniqueId:       2,
// 		title:  		'Title image 2',
// 		description: 	'Desc 2',
// 		filename:    	'sample1.jpg',
// 		views: 		0,
// 		likes: 		0,
// 		timestamp: 	Date.now
// 	},{
// 		uniqueId:       3,
// 		title:  		'Title image 3',
// 		description: 	'Desc 3',
// 		filename:    	'sample1.jpg',
// 		views: 		0,
// 		likes: 		0,
// 		timestamp: 	Date.now
// 	},{
// 		uniqueId:       4,
// 		title:  		'Title image 4',
// 		description: 	'Desc 4',
// 		filename:    	'sample1.jpg',
// 		views: 		0,
// 		likes: 		0,
// 		timestamp: 	Date.now
// 	}
// 	]
// };
var viewModel = {
	images: []
};

// // res.render('index', viewModel);
// sidebar(viewModel, function(viewModel) {
// 	res.render('index', viewModel);
// });

ImageModel.find(
	{}
	, {}
	, { sort: { timestamp: -1 }}
	,
	function(err, images) {
		if (err) 
			{ throw err; }
		//console.log("home tim thay");
		viewModel.images = images;
		console.log(viewModel);
		sidebar(viewModel, function(viewModel) {
			// console.log("home tra ve");
			// console.log(viewModel);
			res.render('index', viewModel);
		});
	}
);

}
};