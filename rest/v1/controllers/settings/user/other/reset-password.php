<?php
// set http header
require '../../../../core/header.php';
require '../../../../core/Encryption.php';
// use needed functions
require '../../../../core/functions.php';
// use notification template
require '../../../../notification/reset-password.php';
// use needed classes
require '../../../../models/settings/user/other/UserOther.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_other = new UserOther($conn);
$response = new Response();
$encrypt = new Encryption();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if usersystemid is in the url e.g. /usersystem/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);
    // get task id from query string
    // get usersystemid from query string
    $user_other->user_other_key = $encrypt->doHash(rand());
    $user_other->user_other_datetime = date("Y-m-d H:i:s");
    $user_other->employee_email = trim($data["email"]);
    $password_link = "/other/create-password";

    $query = $user_other->readLogin();
    if ($query->rowCount() == 0) {
        $response->setSuccess(false);
        $error["count"] = 0;
        $error["success"] = false;
        $error['error'] = "Invalid email. Please use a registered one.";
        $response->setData($error);
        $response->send();
        exit;
    }

    $mail = sendEmail(
        $password_link,
        $user_other->employee_email,
        $user_other->user_other_key
    );

    $query = checkResetPassword($user_other);
    http_response_code(200);
    $returnData["data"] = [];
    $returnData["count"] = $user_other->employee_email;
    $returnData["success"] = true;
    $response->setData($returnData);
    $response->send();
    exit;
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
