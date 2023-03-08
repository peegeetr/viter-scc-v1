<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$network = new Network($conn);
// get $_GET data
// check if networkid is in the url e.g. /network/1
$error = [];
$returnData = [];
if (array_key_exists("networkid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get networkid from query string
    $network->network_aid = $_GET['networkid'];
    $network->network_name = checkIndex($data, "network_name");
    $network->network_church = checkIndex($data, "network_church");
    $network->network_datetime = date("Y-m-d H:i:s");
    $network_name_old = checkIndex($data, "network_name_old");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($network->network_aid);
    // check name
    compareName($network, $network_name_old, $network->network_name);
    // update
    $query = checkUpdate($network);
    returnSuccess($network, "network", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
