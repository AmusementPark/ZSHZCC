// MYSQL TABLE MANAGER
var zzrequire = require('zzrequire');
var models 	= zzrequire('db');
//======================================================================================
module.exports = function(sequelize, DataTypes) {
	var MANAGER = sequelize.define("MANAGER", {
	    ID : {
	    	type: DataTypes.INTEGER.UNSIGNED,
	    	autoIncrement: true,
	    	primaryKey: true
	    },
	    NAME	: DataTypes.STRING(80),
	    PSWD	: DataTypes.STRING(80)
	}, {
		paranoid: true,
		timestamps: false,
		freezeTableName: true,
		// 
		classMethods : {
			associate : function(models) {
				MANAGER.hasMany(models.ARTICLE, {foreignKey:'ID'});
			}
		}
	});
	return MANAGER;
};
//======================================================================================