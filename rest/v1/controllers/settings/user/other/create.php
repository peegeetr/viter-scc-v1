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
// get should not be present
if (array_key_exists("userotherid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$user_other->user_other_is_active = 1;
$user_other->user_other_member_id = checkIndex($data, "user_other_member_id");
$user_other->members_email = checkIndex($data, "members_email");
$user_other->user_other_role_id = checkIndex($data, "user_other_role_id");
$user_other->user_other_key = $encrypt->doHash(rand());
$user_other->user_other_created = date("Y-m-d H:i:s");
$user_other->user_other_datetime = date("Y-m-d H:i:s");
$password_link = "/create-password";

// check email  

$result = $user_other->readEmailAndName();

$row = $result->fetch(PDO::FETCH_ASSOC);
extract($row);
$name = "$members_last_name, $members_first_name";
$email = $members_email;
// send email notification
sendEmail(
    $password_link,
    $name,
    $email,
    $user_other->user_other_key
);
// create
$query = checkCreate($user_other);

returnSuccess($user_other, "User other", $query);
