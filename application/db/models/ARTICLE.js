// MYSQL TABLE MANAGER
var zzrequire = require('zzrequire');
var models 	= zzrequire('db');
//======================================================================================
module.exports = function(sequelize, DataTypes) {
	var ARTICLE = sequelize.define('ARTICLE', {
		ID : {
	    	type : DataTypes.INTEGER.UNSIGNED,
	    	autoIncrement: true,
	    	primaryKey : true
	    },
	    LOGO	: DataTypes.STRING(300),
	    HEAD	: DataTypes.STRING(300),
	    ABSTRACT: DataTypes.TEXT,
	    BODY	: DataTypes.TEXT,
	    AUTHOR	: DataTypes.INTEGER.UNSIGNED,
	    CLAZZ	: DataTypes.INTEGER.UNSIGNED,
	    TAG		: DataTypes.STRING(50),
		ACTIVE  : DataTypes.INTEGER.UNSIGNED,
	    DATE	: DataTypes.DATE
	}, {
		paranoid: true,
		timestamps: false,
		freezeTableName: true,
		//
		classMethods : {
			associate : function(models) {
				ARTICLE.hasOne(models.ARTICLE_EXT, {foreignKey:'ARTI_ID', as:'A'});
				ARTICLE.belongsTo(models.MANAGER, {foreignKey:'AUTHOR'});
			}
		}
	});
	return ARTICLE;
};
//======================================================================================
