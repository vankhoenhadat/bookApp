var fs = require('fs'),
path = require('path');
var sidebar = require('../helpers/sidebar');
var Models = require('../models');
var md5 = require('MD5');
module.exports = {
	// index: function(req, res) {
	// 	res.send('The image:index controller ' +
	// 		req.params.image_id);
	// },
	index: function(req, res) {
		// res.render('image');
		// var viewModel = {
		// 	image: {
		// 		uniqueId: 	1,
		// 		title: 		'Sample Image 1',
		// 		description: 	'This is a sample.',
		// 		filename: 	'sample1.jpg',
		// 		views: 		0,
		// 		likes: 		0,
		// 		timestamp: 	Date.now()
		// 	},
		// 	comments: [
		// 		{
		// 			image_id: 	1,
		// 			email: 		'test@testing.com',
		// 			name: 		'Test Tester',
		// 			gravatar: 	'http://lorempixel.com/75/75/animals/1',
		// 			comment: 	'This is a test comment...',
		// 			timestamp: 	Date.now()
		// 		},{
		// 			image_id: 	1,
		// 			email: 		'test@testing.com',
		// 			name: 		'Test Tester',
		// 			gravatar: 	'http://lorempixel.com/75/75/animals/2',
		// 			comment: 	'Another followup comment!',
		// 			timestamp: 	Date.now()
		// 		}
		// 		]
		// 	};
		var viewModel = {
			image: {},
			comments: []
		};


		// //res.render('image', viewModel);
		// sidebar(viewModel,function(viewModel){
		// 	res.render('image', viewModel);
		// });
		
		Models.Image.findOne(
			{ 
				filename: { $regex: req.params.image_id }
			}
			,function(err, image) {
				if (err)
					 { throw err; }
				if (image) {
					image.views = image.views + 1;
					viewModel.image = image;
					image.save();

					Models.Comment.find(
						{ image_id: image._id}
						, {}
						, { sort: { 'timestamp': 1 }}
						,
					function(err, comments){
						if (err) 
							{ throw err; }
						viewModel.comments = comments;
						sidebar(viewModel, function(viewModel) {
							res.render('image', viewModel);
							});
						}
					);

				} else {
					res.redirect('/');
				}
			}
		);
	},
	create: function(req, res) {

		var saveImage = function() {
			var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
			imgUrl = '';
			for(var i=0; i < 6; i+=1) {
				imgUrl += possible.charAt(Math.floor(Math.random() *
					possible.length));
			}
			/* Start new code: */
			// search for an image with the same filename by performing a find:
			Models.Image.find({ filename: imgUrl }, function(err, images) {
			if (images.length> 0) {
			// if a matching image was found, try again (start over):
				saveImage();
			} 
			else {
				/* end new code:*/
				var tempPath = req.files.file.path,
				ext = path.extname(req.files.file.name).toLowerCase(),
				targetPath = path.resolve('./public/upload/' + imgUrl + ext);
				console.log("tempPath =" + tempPath);
				if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
					fs.rename(tempPath, targetPath, function(err) {
						if (err) 
							{throw err; console.log("err rename");}
						console.log("ok rename" + imgUrl);

						/* Start new code: */
						// create a new Image model, populate its details:
						console.log(req.body);
						var newImg = new Models.Image({
							title: req.body.title,
							filename: imgUrl + ext,
							description: req.body.description
						});
						// and save the new Image
						newImg.save(function(err, image) {
							res.redirect('/images/' + image.uniqueId);
						});
						/* End new code: */

						//res.redirect('/images/' + imgUrl);
					});
				} else {
					fs.unlink(tempPath, function (err) {
						if (err) 
							{throw err; console.log("err unlink");}
						console.log("ok unlink");
						res.json(500, {error: 'Only image files are allowed.'});
					});
				}
				/* Start new code: */
			}
			});
			/* End new code: */
	};
	
	saveImage();


},
	like: function(req, res) {
		// //res.send('The image:like POST controller');
		// res.json({likes: 1});
		Models.Image.findOne({ filename: { $regex: req.params.image_id }
		},
		function(err, image) {
		if (!err && image) {
			image.likes = image.likes + 1;
			image.save(function(err) {
				if (err) {
					res.json(err);
				} else {
					res.json({ likes: image.likes });
				}
			});
			}
		});
	},
	comment: function(req, res) {
		console.log('save comment');
		console.log(req.body);
		if(req.body)
		{
		//res.send('The image:comment POST controller');
		Models.Image.findOne(
			{ filename: { $regex: req.params.image_id }
			}
			, function(err, image) {
				if (!err && image) {
					var newComment = new Models.Comment(req.body);
					newComment.gravatar = md5(newComment.email);
					newComment.image_id = image._id;
					newComment.save(function(err, comment) {
					if (err) 
						{ throw err; }
					res.redirect('/images/' + image.uniqueId + '#' + comment._id);
					});
				} else {
					res.redirect('/');
				}
			}
		);
		}
		else{ res.send('req.body not found');}


	},
	remove: function(req, res) {
		Models.Image.findOne(
			{ filename: { $regex: req.params.image_id }
			},
			function(err, image) {
				if (err) { throw err; }
				if (!err && image) {
					fs.unlink(
						path.resolve('./public/upload/' + image.filename),
						function(err) {
							if (err) { throw err; }
							Models.Comment.remove(
								{ image_id: image._id},
								function(err) {
									image.remove(function(err) {
										if (!err) {
											res.json(true);
										} else {
											res.json(false);
										}
									});
								}
							);
						}
					);
				}
			}
		);
	}


};