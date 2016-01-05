var express = require('express'),
router = express.Router(),
home = require('../controllers/home'),
image = require('../controllers/image')
,multipart = require('connect-multiparty'), multipartMiddleware = multipart()
;
module.exports = function(app) {
router.get('/', home.index);
router.get('/images/:image_id', image.index);
// router.post('/images', image.create);
router.post('/images', multipartMiddleware , image.create);
router.post('/images/:image_id/like', image.like);
router.post('/images/:image_id/comment', image.comment);
app.use(router);
};