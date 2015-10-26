//======================================================================================
var zzrequire = require('zzrequire');
var sequelize = require('sequelize');
var Q		  = require('q');
//--------------------------------------------------------------------------------------
var models 	  = zzrequire('db');
//======================================================================================
var clazzMapping = function(/*string*/ clazz) {
	console.log(clazz);
	switch (clazz) {
	case 'life': return 1;
	case 'work': return 2;
	case 'like': return 3;
	default : return 1;
	} 
}
//var ArticlesCreate = function(req, res, next) {
//	ArticlesApiCreate();
//	return res.end("");
//};
//var ArticlesApiCreate = function(req, res, next) {
//	models.ARTICLE.create({
//	    HEAD : '通过SEQUELIZE创建',
//	    BODY : '超级大小超级大小',
//	    AUTH : 100001
//	}).then(function() {
//		res.send("SUCCESS");
//	});
//};
//var ArticlesDestroy = function(req, res, next) {
//	models.MANAGER.find({
//		where : {
//			ID : 100002
//		}
//	}).then(function(mgrs){
//		models.ARTICLE.destroy({
//			where : { 
//				AUTH: mgrs.ID 
//			}
//		}).then(function(){
//			mgrs.destroy().then(function(){
//				res.send("OK, DELETED");
//			})
//		});
//	});
//};
/**
 * @args - id #Article ID
 */
var getOne = function(id) {
	var defer = Q.defer();
	models.ARTICLE.findAll({
		where : {
			ID : args.id
		},
		order : [
		    ['DATE', 'DESC']
		],
		include : [{
			model: models.ARTICLE_EXT,
			as : 'A',
			attributes: ['READ', 'LIKE']
		},{
			model: models.MANAGER,
			attributes: ['NAME']
		}]
	}).then(function(artis) {
		var arts = [];
		artis.forEach(function(arti) {
			arts.push({
				link : arti.ID,
				logo : arti.LOGO,
				head : arti.HEAD,
				body : arti.BODY,
				abst : arti.ABSTRACT,
				author : arti.MANAGER.NAME,
				clazz: arti.CLAZZ,
				tag  : arti.TAG,
				date : arti.DATE.pattern('yyyy-MM-dd'),
				read : arti.A.READ,
				like : arti.A.LIKE
			});
		});
		defer.resolve(arts);
	});
	return defer.promise;
};
/**
 * @args 
 */
var getList = function(clazz, offset) {
	var defer = Q.defer();
	offset = offset || 0;
	models.ARTICLE.findAll({
		limit : 4,
		offset : /*1+*/offset,
		where : {
			CLAZZ : clazzMapping(clazz),
		},
		order : [
		    ['DATE', 'DESC']
		],
		include : [{
			model: models.ARTICLE_EXT,
			as : 'A',
			attributes: ['READ', 'LIKE']
		},{
			model: models.MANAGER,
			attributes: ['NAME']
		}],
		attributes: { 
			exclude: ['BODY'] 
		}
	}).then(function(artis) {
		var arts = [];
		artis.forEach(function(arti) {
			arts.push({
				link : arti.ID,
				logo : arti.LOGO,
				head : arti.HEAD,
				abst : arti.ABSTRACT,
				author : arti.MANAGER.NAME, 
				clazz: arti.CLAZZ,
				tag  : arti.TAG,
				date : arti.DATE.pattern('yyyy-MM-dd'),
				read : arti.A.READ,
				like : arti.A.LIKE
			});
		});
		defer.resolve(arts);
	});
	return defer.promise;
};
//======================================================================================
exports.getOne  = getOne;
exports.getList = getList;
exports.CLASS = {
	LIFE : 1,
	WORK : 2,
	LIKE : 3
};
//======================================================================================