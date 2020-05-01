const roles = require('user-groups-roles');

module.exports = () => {


    // roles
    roles.createNewRole("admin");
    roles.createNewRole("editor");
    roles.createNewRole("author");
    roles.createNewRole("subscriber");

    // privileges
    roles.createNewPrivileges(["/article", "POST"], "inserts article", false);
    roles.createNewPrivileges(["/article", "PUT"], "edits article", false);
    roles.createNewPrivileges(["/article", "DELETE"], "deletes article", false);

    // admin all add, edit delete select
    roles.addPrivilegeToRole("admin",["/article", "POST"],true);
    roles.addPrivilegeToRole("admin",["/article", "PUT"],true);
    roles.addPrivilegeToRole("admin",["/article", "DELETE"],true);


    // editor insert, edit select
    roles.addPrivilegeToRole("editor",["/article", "POST"],true);
    roles.addPrivilegeToRole("editor",["/article", "PUT"],true);

    // author insert
    roles.addPrivilegeToRole("author",["/article", "POST"],true);



}