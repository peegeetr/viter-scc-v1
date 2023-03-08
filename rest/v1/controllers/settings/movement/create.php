<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$movement = new Movement($conn);
// get should not be present
if (array_key_exists("movementid", $_GET)) {
    checkEndpoint();

}
// check data
checkPayload($data);
// get data
$movement->movement_name = checkIndex($data, "movement_name");
$movement->movement_church = checkIndex($data, "movement_church");
$movement->movement_is_active = 1;
$movement->movement_created = date("Y-m-d");
$movement->movement_datetime = date("Y-m-d H:i:s");
// check name
 isNameExist($movement, $movement->movement_name);
$query = checkCreate($movement);
returnSuccess($movement, "Movement", $query);
