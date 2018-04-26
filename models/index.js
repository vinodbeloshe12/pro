var db = require('../db'); //reference of dbconnection.js

var User = {
    login: function (logindata, callback) {
        return db.query("SELECT `id`, `name`, `email`, `mobile`, `date`, `isActive` FROM `register` where email=? AND password=?", [logindata.email, logindata.password], callback);
    },
    getAllUser: function (callback) {
        return db.query("SELECT `id`, `name`, `email`, `mobile`, `password`, `date`, `isActive` FROM `register` WHERE 1 AND isActive=1", callback);
    },
    getUserById: function (id, callback) {
        return db.query("SELECT `id`, `name`, `email`, `mobile`, `password`, `date`, `isActive` FROM `register` WHERE id=?", [id], callback);
    },

    updateUser: function (data, callback) {
        return db.query("UPDATE `register` SET `name`=?, `mobile`=?, `email`=?, `password`=? WHERE id=?", [data.name, data.mobile, data.email, data.password, data.id], callback);
    },
    deleteUser: function (userId, callback) {
        return db.query("UPDATE `register` SET `isActive`=0 WHERE id=?", [userId], callback);
    },
}

module.exports = User;