var db = require('../db'); //reference of dbconnection.js

var Work = {

    getAllWork: function (userData, callback) {

    },

    getWorkByProjectId: function (projectId, callback) {
        return db.query("SELECT work.`id`, work.`projectId`, work.`style`, work.`description`, work.`htmlWorkUser`,r1.username as 'htmlWorkUserName', work.`htmlWorkStatus`, work.`descriptionWorkUser`, r2.username as 'descriptionWorkUserName', work.`descriptionWorkStatus`, work.`htmlQcUser`,r3.username as 'htmlQcUserName', work.`htmlQcStatus`, work.`descriptionQcUser`, r4.username as 'descriptionQcUserName',work.`descriptionQcStatus`, work.`adminHtmlStatus`, work.`adminDescriptionStatus`, work.`lastmodified`, work.`html`, work.`longdescription`, work.`createdBy` FROM `work` LEFT JOIN register r1 on r1.id=work.htmlWorkUser LEFT JOIN register r2 ON r2.id=work.descriptionWorkUser LEFT JOIN register r3 ON work.htmlQcUser=r3.id LEFT JOIN register r4 ON work.descriptionQcUser=r4.id WHERE work.`projectId`=?", [projectId], callback);
    },

    addWork: function (data, callback) {
        let sql = `INSERT INTO work(projectid,style,description)  VALUES ?  `;
        return db.query(sql, [data], callback);
    },

    assignWork: function (data, callback) {
        if (data.workType == 1 && data.role == 3) {
            var test = 'update work set htmlWorkUser=' + data.userId + ' where projectid=' + data.projectId + ' and style in (' + data.data + ')';
        } else if (data.workType == 2 && data.role == 3) {
            var test = 'update work set descriptionWorkUser=' + data.userId + ' where projectid=' + data.projectId + ' and style in (' + data.data + ')';
        } else if (data.workType == 3 && data.role == 3) {
            var test = 'update work set descriptionWorkUser=' + data.userId + ', htmlWorkUser=' + data.userId + '  where projectid=' + data.projectId + ' and style in (' + data.data + ')';
        } else if (data.workType == 1 && data.role == 2) {
            var test = 'update work set htmlQcUser=' + data.userId + ' where projectid=' + data.projectId + ' and style in (' + data.data + ')';
        } else if (data.workType == 2 && data.role == 2) {
            var test = 'update work set descriptionQcUser=' + data.userId + ' where projectid=' + data.projectId + ' and style in (' + data.data + ')';
        } else if (data.workType == 3 && data.role == 2) {
            var test = 'update work set descriptionQcUser=' + data.userId + ', htmlQcUser=' + data.userId + '  where projectid=' + data.projectId + ' and style in (' + data.data + ')';
        }
        return db.query(test, callback);
    },

    updateProject: function (data, callback) {
        var workUsers = db.query('select htmlWorkUsers,descriptionWorkUsers,htmlQcUsers,descriptionQcUsers from project where id=' + data.projectId, function (err, respo) {
            if (err) {
                console.log(err)
            } else {
                if (respo && respo.length > 0) {
                    console.log("respo", respo, respo[0].htmlWorkUsers)
                    if (data.role == 3) {
                        var htmlWorkUsers = respo[0].htmlWorkUsers ? respo[0].htmlWorkUsers + "," + data.userId : data.userId;
                        var descriptionWorkUsers = respo[0].descriptionWorkUsers ? respo[0].descriptionWorkUsers + "," + data.userId : data.userId;
                    } else {
                        var htmlWorkUsers = respo[0].htmlWorkUsers;
                        var descriptionWorkUsers = respo[0].descriptionWorkUsers;
                        var htmlQcUsers = respo[0].htmlQcUsers ? respo[0].htmlQcUsers + "," + data.userId : data.userId;
                        var descriptionQcUsers = respo[0].descriptionQcUsers ? respo[0].descriptionQcUsers + "," + data.userId : data.userId;
                    }
                } else {
                    var htmlWorkUsers = data.userId;
                    var descriptionWorkUsers = data.userId;
                    var htmlQcUsers = data.userId;
                    var descriptionQcUsers = data.userId;
                }
                if (data.workType == 1 && data.role == 3) {
                    var test = 'update project set htmlWorkStatus=1,htmlWorkUsers="' + htmlWorkUsers + '" where id=' + data.projectId;
                } else if (data.workType == 2 && data.role == 3) {
                    var test = 'update project set descriptionWorkStatus=1,descriptionWorkUsers=' + descriptionWorkUsers + ' where id=' + data.projectId;
                } else if (data.workType == 3 && data.role == 3) {
                    var test = 'update project set htmlWorkStatus=1,descriptionWorkStatus=1,htmlWorkUsers=' + htmlWorkUsers + ',descriptionWorkUsers=' + descriptionWorkUsers + ' where id=' + data.projectId;
                } else if (data.workType == 1 && data.role == 2) {
                    var test = 'update project set htmlQcStatus=1,htmlQcUsers=' + htmlQcUsers + ' where id=' + data.projectId;
                } else if (data.workType == 2 && data.role == 2) {
                    var test = 'update project set descriptionQcStatus=1,descriptionQcUsers=' + descriptionQcUsers + ' where id=' + data.projectId;
                } else if (data.workType == 3 && data.role == 2) {
                    var test = 'update project set htmlQcStatus=1,descriptionQcStatus=1,htmlQcUsers=' + htmlQcUsers + ',descriptionQcUsers=' + descriptionQcUsers + ' where id=' + data.projectId;
                }
                return db.query(test, callback);
            }

        })


    },

}

module.exports = Work;