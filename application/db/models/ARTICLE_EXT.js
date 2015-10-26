// MYSQL TABLE MANAGER
var zzrequire = require('zzrequire');
var models 	= zzrequire('db');
//======================================================================================
module.exports = function(sequelize, DataTypes) {
	var ARTICLE_EXT = sequelize.define('ARTICLE_EXT', {
		ID : {
	    	type : DataTypes.INTEGER.UNSIGNED,
	    	primaryKey : true,
	    	autoIncrement : true
	    },
	    ARTI_ID	: DataTypes.STRING(300),
	    READ	: DataTypes.INTEGER.UNSIGNED,
	    LIKE	: DataTypes.INTEGER.UNSIGNED
	}, {
		paranoid: true,
		timestamps: false,
		freezeTableName: true,
		//
		classMethods : {
			associate : function(models) {
				ARTICLE_EXT.belongsTo(models.ARTICLE, {foreignKey:'ID'});
			}
		}
	});
	return ARTICLE_EXT;
};
//======================================================================================
