<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_other = new UserOther($conn);
$encrypt = new Encryption();
// get should not be present
if (array_key_exists("userotherid", $_GET)) {
    $response->setSuccess(false);
    $error['code'] = "404";
    $error['error'] = "Endpoint not found.";
    $error["success"] = false;
    return $error;
}
// check data
checkPayload($data);
// get data
$user_other->user_other_is_active = 1;
$user_other->user_other_emp_id = addslashes(trim($data["user_other_emp_id"]));
$user_other->user_other_role_id = addslashes(trim($data["user_other_role_id"]));
$user_other->user_other_key = $encrypt->doHash(rand());
$user_other->user_other_created = date("Y-m-d");
$user_other->user_other_datetime = date("Y-m-d H:i:s");
$first_name = trim($data["first_name"]);
$email = trim($data["email"]);
$password_link = "/other/create-password";
// check email
isEmailExist($user_other, $user_other->user_other_emp_id);
// send email notification
$mail = sendEmail(
    $password_link,
    $first_name,
    $email,
    $user_other->user_other_key
);
// create
$query = checkCreate($user_other);
returnSuccess($user_other, "User", $query);
