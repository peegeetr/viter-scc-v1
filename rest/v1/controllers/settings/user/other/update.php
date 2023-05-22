<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_other = new UserOther($conn);
// get $_GET data
// check if userotherid is in the url e.g. /userotherid/1
$error = [];
$returnData = [];
if (array_key_exists("userotherid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get userotherid from query string
    $user_other->user_other_aid = $_GET['userotherid'];
    $user_other->user_other_member_id = checkIndex($data, "user_other_member_id");
    $user_other->user_other_role_id = checkIndex($data, "user_other_role_id");
    $user_other->user_other_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($user_other->user_other_aid);

    // check email 
    // update
    $query = checkUpdate($user_other);

    returnSuccess($user_other, "User other", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
