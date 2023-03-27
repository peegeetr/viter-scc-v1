<?php
// check database connection
require '../../../../core/Encryption.php';
// use notification template
require '../../../../notification/verify-account.php';
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_system = new UserSystem($conn);
$encrypt = new Encryption();
// get should not be present
if (array_key_exists("usersystemid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$user_system->user_system_name = addslashes(trim($data["user_system_name"]));
$user_system->user_system_is_active = 1;
$user_system->user_system_email = addslashes(trim($data["user_system_email"]));
$user_system->user_system_role_id = addslashes(trim($data["user_system_role_id"]));
$user_system->user_system_key = $encrypt->doHash(rand());
$user_system->user_system_created = date("Y-m-d H:i:s");
$user_system->user_system_datetime = date("Y-m-d H:i:s");

$password_link = "/system/create-password";
// check email
isEmailExist($user_system, $user_system->user_system_email);
// send email notification
sendEmail(
    $password_link,
    $user_system->user_system_name,
    $user_system->user_system_email,
    $user_system->user_system_key
);
// create
$query = checkCreate($user_system);

returnSuccess($user_system, "User system", $query);
