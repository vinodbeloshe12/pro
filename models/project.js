var db = require('../db'); //reference of dbconnection.js

var Project = {

    getAllProject: function (userData, callback) {
        console.log("userdata", userData)
        if (userData.id == 1) {
            return db.query("SELECT project.`id`, project.`createdDate`, project.`name`, project.`file`, project.`client`, project.`startDate`, project.`endDate`, project.`createdBy`, project.`updatedBy`, project.`projectType`, project.`htmlWorkUsers`, project.`descriptionWorkUsers`, project.`updatedDate`, project.`isActive`, w1.name as'htmlWorkStatus',  w2.name as 'descriptionWorkStatus', w3.name as 'htmlQcStatus', w4.name as 'descriptionQcStatus', project.`htmlQcUsers`, project.`descriptionQcUsers`, project.`comment` FROM `project`  LEFT JOIN workstatus as w1  ON project.htmlWorkStatus=w1.id LEFT JOIN workstatus as w2 On project.descriptionWorkStatus=w2.id LEFT JOIN workstatus as w3 ON project.htmlQcStatus=w3.id LEFT JOIN workstatus as w4 ON project.descriptionQcStatus=w4.id WHERE project.isActive=1 ORDER BY project.id DESC", callback);
            // return db.query("SELECT `id`, `createdDate`, `name`, `file`, `client`, `startDate`, `endDate`, `createdBy`, `updatedBy`, `projectType`, `workusers`, `htmlWorkStatus`, `descriptionWorkStatus`, `htmlWorkUsers`, `descriptionWorkUsers`, `updatedDate`, `isActive`, `htmlQcStatus`, `descriptionQcStatus`, `htmlQcUsers`, `descriptionQcUsers`, `comment`  FROM `project` WHERE 1 ORDER BY id DESC", callback);
        } else {
            return db.query("SELECT project.`id`, project.`createdDate`, project.`name`, project.`file`, project.`client`, project.`startDate`, project.`endDate`, project.`createdBy`, project.`updatedBy`, project.`projectType`, project.`htmlWorkUsers`, project.`descriptionWorkUsers`, project.`updatedDate`, project.`isActive`, w1.name as'htmlWorkStatus',  w2.name as 'descriptionWorkStatus', w3.name as 'htmlQcStatus', w4.name as 'descriptionQcStatus', project.`htmlQcUsers`, project.`descriptionQcUsers`, project.`comment` FROM `project`  LEFT JOIN workstatus as w1  ON project.htmlWorkStatus=w1.id LEFT JOIN workstatus as w2 On project.descriptionWorkStatus=w2.id LEFT JOIN workstatus as w3 ON project.htmlQcStatus=w3.id LEFT JOIN workstatus as w4 ON project.descriptionQcStatus=w4.id WHERE project.isActive=1 AND FIND_IN_SET(" + userData.id + ",project.htmlWorkUsers) || FIND_IN_SET(" + userData.id + ", project.descriptionWorkUsers) || FIND_IN_SET(" + userData.id + ", project.htmlQcUsers) || FIND_IN_SET(" + userData.id + ", project.descriptionQcUsers) ORDER BY project.id DESC", callback);
        }
    },

    getProjectById: function (id, callback) {
        return db.query("SELECT project.`id`, project.`createdDate`, project.`name`, project.`file`, project.`client`, project.`startDate`, project.`endDate`, project.`createdBy`, project.`updatedBy`, project.`projectType`, project.`htmlWorkUsers`, project.`descriptionWorkUsers`, project.`updatedDate`, project.`isActive`, w1.name as'htmlWorkStatus',  w2.name as 'descriptionWorkStatus', w3.name as 'htmlQcStatus', w4.name as 'descriptionQcStatus', project.`htmlQcUsers`, project.`descriptionQcUsers`, project.`comment` FROM `project`  LEFT JOIN workstatus as w1  ON project.htmlWorkStatus=w1.id LEFT JOIN workstatus as w2 On project.descriptionWorkStatus=w2.id LEFT JOIN workstatus as w3 ON project.htmlQcStatus=w3.id LEFT JOIN workstatus as w4 ON project.descriptionQcStatus=w4.id WHERE project.isActive=1 AND project.id=? ORDER BY project.id DESC", [id], callback);

    },

    addProject: function (data, callback) {
        return db.query("INSERT INTO `project`(`name`, `file`, `client`, `startDate`, `endDate`, `createdBy`, `projectType`) VALUES (?,?,?,?,?,?,?)", [data.name, data.file, data.client, data.startDate, data.endDate, data.loggedUser, data.projectType], callback);
    },
    updateProject: function (data, callback) {
        return db.query("UPDATE `project` set `name`=?, `file`=?, `client`=?, `startDate`=?, `endDate`=?, `updatedBy`=?, `projectType`=? WHERE id=?", [data.name, data.file, data.client, data.startDate, data.endDate, data.loggedUser, data.projectType, data.id], callback);
    },
    deleteProject: function (id, callback) {
        return db.query("UPDATE `project` set `isActive`=0 WHERE id=?", [id], callback);
    }

}

module.exports = Project;