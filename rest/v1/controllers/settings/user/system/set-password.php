<?php
// set http header
require '../../../../core/header.php';
require '../../../../core/Encryption.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/settings/user/system/UserSystem.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_system = new UserSystem($conn);
$response = new Response();
$encrypt = new Encryption();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if usersystemkey is in the url e.g. /usersystem/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);
    // get task id from query string
    $user_system->user_system_password = $encrypt->doPasswordHash($data["new_password"]);
    $user_system->user_system_key = $data["key"];
    $user_system->user_system_datetime = date("Y-m-d H:i:s");
    //check to see if task id in query string is not empty and is number, if not return json error
    $query = checkSetPassword($user_system);
    http_response_code(200);
    returnSuccess($user_system, "Key", $query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
