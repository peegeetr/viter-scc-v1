<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Role($conn);
// get $_GET data
// check if roleid is in the url e.g. /role/1
$error = [];
$returnData = [];
if (array_key_exists("roleid", $_GET)) {
    // get data
    // get task id from query string
    $role->role_aid = $_GET['roleid'];
    $column_name = strtolower($data['role_name']);
    $is_developer = $data['isDeveloper'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($role->role_aid);
    // delete

    if ($is_developer == 1) {
        isUserSystemAssociated($role);
    }

    isUserOtherAssociated($role);

    $query = checkDelete($role);
    checkDropColumnName($role, $column_name);

    returnSuccess($role, "Role", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
