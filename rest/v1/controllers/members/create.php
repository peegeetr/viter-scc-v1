<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$members = new Members($conn);
// get should not be present
if (array_key_exists("membersid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$members->members_id = checkIndex($data, "members_id");
$members->members_pre_membership_date = checkIndex($data, "members_pre_membership_date");
$members->members_first_name = checkIndex($data, "members_first_name");
$members->members_last_name = checkIndex($data, "members_last_name");
$members->members_middle_name = checkIndex($data, "members_middle_name");
$members->members_gender = checkIndex($data, "members_gender");
$members->members_birth_date = checkIndex($data, "members_birth_date");
$members->members_is_active = 1;
$members->members_created = date("Y-m-d H:i:s");
$members->members_datetime = date("Y-m-d H:i:s"); 
 
$name = "$members->members_last_name, $members->members_first_name";

// check name
    isNameExist($members, $name);
    // create
    $query = checkCreate($members);  
returnSuccess($members, "members", $query);
