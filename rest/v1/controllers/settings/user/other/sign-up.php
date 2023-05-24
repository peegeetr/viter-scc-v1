<?php
// check database connection
// use JWT
require '../../../../jwt/vendor/autoload.php';
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed encryption
require '../../../../core/Encryption.php';
// use needed classes
require '../../../../models/settings/user/other/UserOther.php';
// use notification template
require '../../../../notification/verify-account.php';
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_other = new UserOther($conn);
$encrypt = new Encryption();
$response = new Response();

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
    if (array_key_exists("userotherid", $_GET)) {
        checkEndpoint();
    }
    // check data
    checkPayload($data);
    // get data
    $user_other->user_other_is_active = 1;
    $user_other->members_email = checkIndex($data, "members_email");
    $user_other->user_other_key = $encrypt->doHash(rand());
    $user_other->user_other_created = date("Y-m-d H:i:s");
    $user_other->user_other_datetime = date("Y-m-d H:i:s");
    $password_link = "/create-password";

    // check if email exist   
    isMemberAccountExist($user_other, $user_other->members_email);
    // check if member email is approved   
    checkMemberEmail($user_other);


    // read member role   
    $memberRole = $user_other->readMemberRole();
    if ($memberRole->rowCount() > 0) {
        $roleRow = $memberRole->fetch(PDO::FETCH_ASSOC);
        extract($roleRow);
        $user_other->user_other_role_id = checkIndex($roleRow, "role_aid");
    }

    // read member email and name   
    $emailAndName = $user_other->readMemberEmail();
    if ($emailAndName->rowCount() > 0) {
        $memberRow = $emailAndName->fetch(PDO::FETCH_ASSOC);
        extract($memberRow);
        $name = "$members_last_name, $members_first_name";
        $user_other->user_other_member_id = checkIndex($memberRow, "members_aid");
    }
    // send email notification
    sendEmail(
        $password_link,
        $name,
        $user_other->members_email,
        $user_other->user_other_key
    );

    // create
    $query = checkCreate($user_other);

    returnSuccess($user_other, "User other", $query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
