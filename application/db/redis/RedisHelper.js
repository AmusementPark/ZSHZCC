//var Promise = require('bluebird');
//var CircularJSON = require('circular-json');
//var crypto = require('crypto');
//var redis = null;
//var sequelize = null;
//======================================================================================
var zzrequire = require('zzrequire');
var redisconf = zzrequire('config/redisconf.json');
var ArticleMySQLHelper = zzrequire('db/helper/Articles');
//--------------------------------------------------------------------------------------
var redis = require('redis').createClient(redisconf);
var Q     = require('q');
//--------------------------------------------------------------------------------------
redis.on('error', function (err) {
    console.log('error event - ' + redis.host + ':' + redis.port + ' - ' + err);
});

//--------------------------------------------------------------------------------------
var ArticleHelper = function () {
    this.ArticleIDSet  = "ArticleIDSet";
    this.ArticlePrifix = "ARTICLE";
    this.isNoMore = false;
    this.ArticlesOnceRequestNum = 4;
};
//--------------------------------------------------------------------------------------
ArticleHelper.prototype.getOne = function(clazz, artid) {
    var that = this;
    var d = Q.defer();
    redis.hget(that.ArticlePrifix+artid, [that.ArticlePrifix], function(err, res) {
        if (res == null) {
            ArticleMySQLHelper.getOne(artid).then(function(item) {
                var json = item[0];
                    json.link = 'article/'+clazz+'/'+json.link;
                redis.hset(that.ArticlePrifix+artid, [that.ArticlePrifix, JSON.stringify(json)], function(err, res) {
                    d.resolve(json);
                });
            });
        } else {
            d.resolve(JSON.parse(res));
        }
    });
    return d.promise;
};
//--------------------------------------------------------------------------------------
ArticleHelper.prototype.getOneDetail = function(clazz, artid) {
    var that = this;
    var d = Q.defer();
    that.getOne(clazz, artid).then(function(json) {
        json.read++;
        redis.hset(that.ArticlePrifix+artid, [that.ArticlePrifix, JSON.stringify(json)], function(err, res) {
            d.resolve(json);
        });
    });
    return d.promise;
};
//--------------------------------------------------------------------------------------
/**
 *
 * @param clazz
 * @param offset
 * @returns {*}
 */
ArticleHelper.prototype.getList = function(clazz, offset) {
    offset = offset || 0;
    var that = this;
    var d = Q.defer();

    redis.zrevrange([that.ArticleIDSet+clazz, offset, offset+that.ArticlesOnceRequestNum-1], function(err, res) {
        var _ = [];
        res.forEach(function(artid) {
            _.push(that.getOne(clazz, artid));
        });
        Q.all(_).then(function(artis) {
            d.resolve(artis);
        });
    });

    return d.promise;
};
//--------------------------------------------------------------------------------------
// ɾ������, ���ķ�ʽ������Ϣ
ArticleHelper.prototype.delete = function() {

};
//--------------------------------------------------------------------------------------
// ��ʼ������ȫ������ID. ���¾�����
ArticleHelper.prototype.init = function() {
    var that = this;
    var _ = [];
    ['life', 'work', 'like'].forEach(function(clazz) {
        var p =
        ArticleMySQLHelper.getIDs(clazz).then(function (artis) {
            if( artis.length == 0 ) {
                return null;
            }
            var done = 0,
                d = Q.defer();
            // ����. ��ȫ�����뵽��REDIS֮����׼��������Ϣ
            artis.forEach(function(arti) {
                redis.zadd(that.ArticleIDSet+clazz, [1, arti.ID], function(err, res) {
                    done++;
                    if (done == artis.length) {
                        d.resolve();
                    }
                });
            });
            return d.promise;
        });
        if ( p != null ) {
            _.push(p);
        }
    });
    return Q.all(_);
};
//--------------------------------------------------------------------------------------
var _01 = new ArticleHelper();
exports.ArticleHelper = _01;

//module.exports = init;
//
///**
// * Initializer to return the cacher constructor
// */
//function init(seq, red) {
//    sequelize = seq;
//    redis = red;
//    return Cacher;
//}
//
///**
// * Constructor for cacher
// */
//function Cacher(model) {
//    if (!(this instanceof Cacher)) {
//        return new Cacher(model);
//    }
//    this.method = 'find';
//    this.modelName = model;
//    this.model = sequelize.model(model);
//    this.options = {};
//    this.seconds = 0;
//    this.cacheHit = false;
//    this.cachePrefix = 'cacher';
//}
//
///**
// * Set cache prefix
// */
//Cacher.prototype.prefix = function prefix(cachePrefix) {
//    this.cachePrefix = cachePrefix;
//    return this;
//};
//
///**
// * Execute the query and return a promise
// */
//Cacher.prototype.query = function query(options) {
//    this.options = options || this.options;
//    return this.fetchFromCache();
//};
//
///**
// * Set redis TTL (in seconds)
// */
//Cacher.prototype.ttl = function ttl(seconds) {
//    this.seconds = seconds;
//    return this;
//};
//
///**
// * Fetch from the database
// */
//Cacher.prototype.fetchFromDatabase = function fetchFromDatabase(key) {
//    var method = this.model[this.method];
//    var self = this;
//    return new Promise(function promiser(resolve, reject) {
//        if (!method) {
//            return reject(new Error('Invalid method - ' + self.method));
//        }
//        return method.call(self.model, self.options)
//            .then(function then(results) {
//                var res;
//                if (!results) {
//                    res = results;
//                } else if (Array.isArray(results)) {
//                    res = results;
//                } else if (results.toString() === '[object SequelizeInstance]') {
//                    res = results.get({ plain: true });
//                } else {
//                    res = results;
//                }
//                return self.setCache(key, res, self.seconds)
//                    .then(
//                    function good() {
//                        return resolve(res);
//                    },
//                    function bad(err) {
//                        return reject(err);
//                    }
//                );
//            },
//            function(err) {
//                reject(err);
//            });
//    });
//};
//
///**
// * Set data in cache
// */
//Cacher.prototype.setCache = function setCache(key, results, ttl) {
//    return new Promise(function promiser(resolve, reject) {
//        var res;
//        try {
//            res = JSON.stringify(results);
//        } catch (e) {
//            return reject(e);
//        }
//        return redis.setex(key, ttl, res, function(err, res) {
//            if (err) {
//                return reject(err);
//            }
//            return resolve(res);
//        });
//    });
//};
//
///**
// * Clear cache with given query
// */
//Cacher.prototype.clearCache = function clearCache(opts) {
//    var self = this;
//    this.options = opts || this.options;
//    return new Promise(function promiser(resolve, reject) {
//        var key = self.key();
//        return redis.del(key, function onDel(err) {
//            if (err) {
//                return reject(err);
//            }
//            return resolve();
//        });
//    });
//};
//
///**
// * Fetch data from cache
// */
//Cacher.prototype.fetchFromCache = function fetchFromCache() {
//    var self = this;
//    return new Promise(function promiser(resolve, reject) {
//        var key = self.key();
//        return redis.get(key, function(err, res) {
//            if (err) {
//                return reject(err);
//            }
//            if (!res) {
//                return self.fetchFromDatabase(key).then(resolve, reject);
//            }
//            self.cacheHit = true;
//            try {
//                return resolve(JSON.parse(res));
//            } catch (e) {
//                return reject(e);
//            }
//        });
//    });
//};
//
///**
// * Create redis key
// */
//Cacher.prototype.key = function key() {
//    var hash = crypto.createHash('sha1')
//        .update(CircularJSON.stringify(this.options, jsonReplacer))
//        .digest('hex');
//    return [this.cachePrefix, this.modelName, this.method, hash].join(':');
//};
//
///**
// * Duck type to check if this is a sequelize DAOFactory
// */
//function jsonReplacer(key, value) {
//    if (value && value.DAO && value.sequelize) {
//        return value.name;
//    }
//    return value;
//}
//
///**
// * Add a retrieval method
// */
//function addMethod(key) {
//    Cacher.prototype[key] = function() {
//        this.method = key;
//        return this.query.apply(this, arguments);
//    };
//}
//
//var methods = [
//    'find',
//    'findOne',
//    'findAll',
//    'findAndCountAll',
//    'all',
//    'min',
//    'max',
//    'sum',
//    'count'
//];
//
//methods.forEach(addMethod);