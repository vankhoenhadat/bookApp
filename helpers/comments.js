
var models = require('../models'),
async = require('async');
module.exports = {
	newest: function(callback) {
		models.Comment.find(
			{}
			, {}
			, { limit: 5, sort: { 'timestamp': -1 } }
			, function(err, comments){
				var attachImage = function(comment, next) {
					models.Image.findOne(
						{ _id : comment.image_id}
						, function(err, image) {
							if (err) 
								throw err;
							comment.image = image;
							next(err);
						}	
					);
				};
				async.each(comments, attachImage,
					function(err) {
						if (err) 
							throw err;
						callback(err, comments);
					}
				);
			}
		);
	}
};
// module.exports = {
// 	newest: function() {
// 		var comments = [
// 		{
// 			image_id:1,
// 			email:'test@testing.com',
// 			name:'Test Tester',
// 			gravatar: 'http://lorempixel.com/75/75/animals/1',
// 			comment:'This is a test comment...',
// 			timestamp: Date.now(),
// 			image: {
// 				uniqueId:1,
// 				title:'Sample Image 1',
// 				description:'',
// 				filename:'sample1.jpg',
// 				views:0,
// 				likes:0,
// 				timestamp:Date.now
// 			}
// 		}, {
// 			image_id:1,
// 			email:'test@testing.com',
// 			name: 'Test Tester',
// 			gravatar: 'http://lorempixel.com/75/75/animals/2',
// 			comment:'Another followup comment!',
// 			timestamp: Date.now(),
// 			image: {
// 				uniqueId:1,
// 				title:'Sample Image 1',
// 				description:'',
// 				filename:'sample1.jpg',
// 				views:0,
// 				likes:0,
// 				timestamp:Date.now
// 			}
// 		}
// 		];
// 		return comments;
// 	}
// };