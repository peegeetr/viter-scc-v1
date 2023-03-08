<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$network = new Network($conn);
// get should not be present
if (array_key_exists("networkid", $_GET)) {
    checkEndpoint();

}
// check data
checkPayload($data);
// get data
$network->network_name = checkIndex($data, "network_name");
$network->network_church = checkIndex($data, "network_church");
$network->network_is_active = 1;
$network->network_created = date("Y-m-d");
$network->network_datetime = date("Y-m-d H:i:s");
// check name
 isNameExist($network, $network->network_name);
$query = checkCreate($network);
returnSuccess($network, "Network", $query);
