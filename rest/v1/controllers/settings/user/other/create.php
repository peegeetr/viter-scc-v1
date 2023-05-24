<?php
// check database connection
require '../../../../core/Encryption.php';
// use notification template
require '../../../../notification/verify-account.php';
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_other = new UserOther($conn);
$encrypt = new Encryption();
$response = new Response();

$error = [];
$returnData = [];
// get should not be present
if (array_key_exists("userotherid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$user_other->user_other_is_active = 1;
$user_other->user_other_member_id = checkIndex($data, "user_other_member_id");
$user_other->user_other_role_id = checkIndex($data, "user_other_role_id");
$user_other->user_other_key = $encrypt->doHash(rand());
$user_other->user_other_created = date("Y-m-d H:i:s");
$user_other->user_other_datetime = date("Y-m-d H:i:s");
$password_link = "/create-password";

// check email  

$emailAndName = $user_other->readEmailAndName();
if ($emailAndName->rowCount() > 0) {
    $row = $emailAndName->fetch(PDO::FETCH_ASSOC);
    extract($row);
    $name = "$members_last_name, $members_first_name";
    $user_other->members_email = $members_email;
    isMemberAccountExist($user_other, $user_other->members_email);
} else {
    $response->setSuccess(false);
    $error['code'] = "400";
    $error['error'] = "No Data Found.";
    $error["success"] = false;
    $response->setData($error);
    $response->send();
    exit;
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
