var fs = require('fs'),
path = require('path');
var sidebar = require('../helpers/sidebar');
module.exports = {
	// index: function(req, res) {
	// 	res.send('The image:index controller ' +
	// 		req.params.image_id);
	// },
	index: function(req, res) {
		// res.render('image');
		var viewModel = {
			image: {
				uniqueId: 	1,
				title: 		'Sample Image 1',
				description: 	'This is a sample.',
				filename: 	'sample1.jpg',
				views: 		0,
				likes: 		0,
				timestamp: 	Date.now()
			},
			comments: [
				{
					image_id: 	1,
					email: 		'test@testing.com',
					name: 		'Test Tester',
					gravatar: 	'http://lorempixel.com/75/75/animals/1',
					comment: 	'This is a test comment...',
					timestamp: 	Date.now()
				},{
					image_id: 	1,
					email: 		'test@testing.com',
					name: 		'Test Tester',
					gravatar: 	'http://lorempixel.com/75/75/animals/2',
					comment: 	'Another followup comment!',
					timestamp: 	Date.now()
				}
				]
			};
		//res.render('image', viewModel);
		console.log(req.params.image_id);
		sidebar(viewModel,function(viewModel){
			res.render('image', viewModel);
		});
	},
	create: function(req, res) {
		// res.send('The image:create POST controller');
		// res.redirect('/images/1');
		var saveImage = function() {
			var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
			imgUrl = '';
			for(var i=0; i < 6; i+=1) {
				imgUrl += possible.charAt(Math.floor(Math.random() *
					possible.length));
			}
			var tempPath = req.files.file.path,
			ext = path.extname(req.files.file.name).toLowerCase(),
			targetPath = path.resolve('./public/upload/' + imgUrl + ext);
			if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext ===
				'.gif') {
				fs.rename(tempPath, targetPath, function(err) {
					if (err) throw err;
					res.redirect('/images/' + imgUrl);
				});
		} else {
			fs.unlink(tempPath, function () {
				if (err) throw err;
				res.json(500, {error: 'Only image files are allowed.'});
			});
		}
	};
	saveImage();

// // newBegin

// 	// var post = new Post;
// 	// post.title = req.body.title;
// 	// post.slug = functions.removeAccent(req.body.title);
// 	// post.teaser = req.body.teaser;
// 	// post.content = req.body.content;

// 	var file = req.files.file;

// 	var originalFilename = file.name;
// 	// var fileType         = file.type.split('/')[1];
// 	// var fileSize         = file.size;
// 	var _path = '../' + __dirname;
// 	var pathUpload       = _path + './public/upload/' + originalFilename;

// 	var data = fs.readFileSync(file.path);
// 	fs.writeFileSync(pathUpload, data);

// 	// if( fs.existsSync(pathUpload) ) {
// 	// 	post.file = originalFilename;
// 	// }

// 	// post.save(function(err, obj) {
// 	// 	if(!err) {
// 	// 		res.render('post/create', { status : 'success', message : 'Post successful!' });
// 	// 		return false;
// 	// 	}
// 	// });


// sdfssfd
	var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
		imgUrl = '';
		for(var i=0; i < 6; i+=1) {
			imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		var tempPath = req.files.file.path,
		ext = path.extname(req.files.file.name).toLowerCase(),
		targetPath = path.resolve('./public/upload/' + imgUrl + ext);

		// // comment because throw err
		// if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
		// 	fs.rename(tempPath, targetPath, function(err) {
		// 		if (err) throw err;
		// 		res.redirect('/images/' + imgUrl);
		// 	});
		// } else {
		// 	fs.unlink(tempPath, function () {
		// 	if (err) throw err;
		// 	res.json(500, {error: 'Only image files are allowed.'});
		// 	});
		// }
},
	like: function(req, res) {
		//res.send('The image:like POST controller');
		res.json({likes: 1});
	},
	comment: function(req, res) {
		res.send('The image:comment POST controller');
	}
};