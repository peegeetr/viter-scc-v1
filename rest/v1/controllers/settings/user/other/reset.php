<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/settings/user/other/UserOther.php';
// use notification template
require '../../../../notification/reset-password.php';
// check database connection
require '../../../../core/Encryption.php';
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
// check if userotherid is in the url e.g. /user/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);
    // get task id from query string 
    $password_link = "/create-password";
    $user_other->members_email = trim($data["email"]);
    $user_other->user_other_key = $encrypt->doHash(rand());
    $user_other->user_other_datetime = date("Y-m-d H:i:s");

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

    sendEmail(
        $password_link,
        $user_other->members_email,
        $user_other->user_other_key
    );

    // read member email and name   
    $emailAndName = $user_other->readMemberEmail();
    if ($emailAndName->rowCount() > 0) {
        $memberRow = $emailAndName->fetch(PDO::FETCH_ASSOC);
        extract($memberRow);
        $user_other->user_other_member_id = checkIndex($memberRow, "members_aid");
    } else {
        $response->setSuccess(false);
        $error['code'] = "400";
        $error['error'] = "No Data Found.";
        $error["success"] = false;
        $response->setData($error);
        $response->send();
        exit;
    }

    $query = checkReset($user_other);
    returnSuccess($user_other, "User other", $query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
