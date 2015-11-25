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
var getIDs = function(clazz) {
	var _ =
		models.ARTICLE.findAll({
			order : [
				['ID', 'DESC']
			],
			where : {
				CLAZZ : clazzMapping(clazz)
			},
			attributes : ['ID']
		});
	return _;
};
/**
 * @args - id #Article ID
 */
var getOne = function(id) {
	var d = Q.defer();
	models.ARTICLE.findAll({
		where : {
			ID : id
		},
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
				active : arti.ACTIVE,
				date : arti.DATE.pattern('yyyy-MM-dd'),
				read : arti.A.READ,
				like : arti.A.LIKE
			});
		});
		d.resolve(arts);
	});
	return d.promise;
};
/**
 * @args 
 */
var getList = function(clazz, offset) {
	var d = Q.defer();
	offset = offset || 0;
	models.ARTICLE.findAll({
		limit : 4,
		offset : /*1+*/offset,
		where : {
			CLAZZ : clazzMapping(clazz),
		},
		order : [
			/*['DATE', 'DESC']*/
		    ['ID', 'DESC']
		],
		include : [{
			model: models.ARTICLE_EXT,
			as : 'A',
			attributes: ['READ', 'LIKE']
		},{
			model: models.MANAGER,
			attributes: ['NAME']
		}]
		//,
		//attributes: {
		//	exclude: ['BODY']
		//}
	}).then(function(artis) {
		var arts = [];
		artis.forEach(function(arti) {
			arts.push({
				link : arti.ID,
				logo : arti.LOGO,
				head : arti.HEAD,
				abst : arti.ABSTRACT,
				body : arti.BODY,
				author : arti.MANAGER.NAME, 
				clazz: arti.CLAZZ,
				tag  : arti.TAG,
				active : arti.ACTIVE,
				date : arti.DATE.pattern('yyyy-MM-dd'),
				read : arti.A.READ,
				like : arti.A.LIKE
			});
		});
		d.resolve(arts);
	});
	return d.promise;
};
/**
 * @args
 */
var newOne = function() {
	var _ =
	Q.fcall(function(){
		var d =
		models.ARTICLE.create({
			LOGO:"http://www.zshzcc.com/img/arti.png",
			HEAD:"SEQUELIZE测试添加",
			ABSTRACT:"浙江工业大学是我的母校哈哈哈哈哈哈哈嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈啊哈",
			BODY:"SEQUELIZE测试添加, 使用SEQUELIZE ORM框架",
			AUTHOR:"100000",
			CLAZZ:"2",
			TAG:"JavaScript"
		});
		return d;
	}).then(function(arti){
		var d =
		models.ARTICLE_EXT.create({
			ARTI_ID	: arti.ID,
			READ	: 0,
			LIKE	: 0
		});
		return d;
	});
	return _;
};
/**
 * @args
 */
var deleteOne = function(id) {
	var d = Q.defer();
	models.ARTICLE.destroy({
		where : {
			ID: id
		}
	}).then(function() {
		d.resolve();
	});
	return d.promise;
};
//======================================================================================
exports.getOne  = getOne;
exports.getList = getList;
exports.newOne  = newOne;
exports.getIDs  = getIDs;
exports.CLASS = {
	LIFE : 1,
	WORK : 2,
	LIKE : 3
};
//======================================================================================