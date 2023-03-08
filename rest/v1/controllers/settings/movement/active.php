<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/settings/movement/Movement.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$movement = new Movement($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("movementid", $_GET)) {
        // get data
        checkPayload($data);
        // get task id from query string
        $movement->movement_aid = $_GET['movementid'];
        $movement->movement_is_active = trim($data["isActive"]);
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($movement->movement_aid);
        $query = checkActive($movement);
        http_response_code(200);
        returnSuccess($movement, "Movement", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
