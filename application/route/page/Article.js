// ArticleList.js TO ArticleList Page.
// http://www.zshzcc.com/articles/life	->GET
// http://www.zshzcc.com/articles/work	->GET
// http://www.zshzcc.com/articles/hobby	->GET
//======================================================================================
var Articles = require('../restapi/Articles');
//======================================================================================
exports.ArticleList = function(req, res, next) {
	
	var choice = req.params.param;
	console.log(choice);
	
	if( choice == "danyi" ) {
		return res.render("newbill-single");
	}
	
	var prox = new eproxy();
	var userid = utils.get_user_id(req);
	
	// 首先必须确认是否是管理员
	db.exec(adm_sql, [userid], function(err, rows) {
		if( err !==null || rows.length === 0 || rows[0].IS_ADMIN !== "Y" ) {
			return res.status(500).send("");
		}
		prox.emit("get_all_members", rows[0].GRP_ID);
	});
	
	prox.all("get_all_members", function(grp_id) {
		db.exec(mem_sql, [grp_id], 
		function(err, rows) {
			if( err !== null ) {
				return res.status(500).send("");
			}
			var jadeArgs = [];
			var line = [];
			for(var i = 0; i<rows.length; i++) {
				// 最多4个一行
				if( line.length >= 4 ) {
					jadeArgs.push(line);
					line = [];
				}
				line.push({
					name: rows[i].NAME, 
					pics: rows[i].PATH, 
					userid: rows[i].USR_ID,
					balance:'1200'
				});
			}
			if(line.length > 0) {
				jadeArgs.push(line);
			}
			res.render("newbill", {"jadeArgs" : jadeArgs});
		}); 
	});
};