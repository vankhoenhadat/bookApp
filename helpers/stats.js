// module.exports = function() {
// 	var stats = {
// 		images: 0,
// 		comments: 0,
// 		views: 0,
// 		likes: 0
// 	};
// 	return stats;
// };


var models = require('../models'),
async = require('async');
module.exports = function(callback) {
	async.parallel(
		[
			function(next) {
				//next(null, 0);
				models.Image.count({}, next);  // shorthand  and  similar to =>  models.Image.count({}, function(err, total){next(err, total);});
			},
			function(next) {
				//next(null, 0);
				models.Comment.count({}, next);
			},
			function(next) {
				//next(null, 0);
				models.Image.aggregate(
					{ 
						$group : { _id : '1', viewsTotal : { $sum : '$views' } }
					}
					, function(err, result) {
						var viewsTotal = 0;
						if (result.length> 0) {
							viewsTotal += result[0].viewsTotal;
						}
						next(null, viewsTotal);
					}
				);
			},
			function(next) {
				//next(null, 0);
				models.Image.aggregate(
					{ 
						$group : { _id : '1', likesTotal : { $sum : '$likes' }}
					}
					, function (err, result) {
						var likesTotal = 0;
						if (result.length> 0) {
							likesTotal += result[0].likesTotal;
						}
						next(null, likesTotal);
					}
				);
			}
		]
		, function(err, results){
			callback(null, {
				images: 	results[0],
				comments: 	results[1],
				views:		results[2],
				likes:		results[3]
			});
		}
	);
};