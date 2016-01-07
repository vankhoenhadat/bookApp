// module.exports = {
// popular: function() {
// var images =  [
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
// 	];
// return images;
// }
// };

var models = require('../models');
module.exports = {
	popular: function(callback) {
		models.Image.find(
			{}
			, {}
			, { limit: 9, sort: { likes: -1 }}
			,function(err, images) {
				if (err) 
					throw err;
				callback(null, images);
			}
		);
	}
};