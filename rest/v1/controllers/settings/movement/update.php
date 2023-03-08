<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$movement = new Movement($conn);
// get $_GET data
// check if movementid is in the url e.g. /movement/1
$error = [];
$returnData = [];
if (array_key_exists("movementid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get movementid from query string
    $movement->movement_aid = $_GET['movementid'];
    $movement->movement_name = checkIndex($data, "movement_name");
    $movement->movement_church = checkIndex($data, "movement_church");
    $movement->movement_datetime = date("Y-m-d H:i:s");
    $movement_name_old = checkIndex($data, "movement_name_old");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($movement->movement_aid);
    // check name
    compareName($movement, $movement_name_old, $movement->movement_name);
    // update
    $query = checkUpdate($movement);
    returnSuccess($movement, "Movement", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
